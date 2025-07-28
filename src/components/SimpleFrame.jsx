import React, { useRef, useState, useEffect } from 'react';
import './component.css';
import cornerStone from '../assets/cornerStone.svg';
import { useWindowManager } from '../context/WindowManagerContext';

const SimpleFrame = ({ title, children, hasDrawer, id, icon, height, width, minWidth, minHeight, showDimensions, optionalBackground, isResizable = true, hasPadding = true, setOverflowY = true, onResizing = () => { }, exitFlag = false, setIsSidebarOpen = null, isSidebarOpen = null }) => {



  const [isAtFront, setIsAtFront] = useState(false);
  const frameRef = useRef(null);
  const containerBounds = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: Number.parseInt(width) || 500, height: Number.parseInt(height) || 300 });
  const [readSize, setReadSize] = useState({ width: size.width, height: size.height });
  const resizeRef = useRef({ type: null, startX: 0, startY: 0, startW: 0, startH: 0, startLeft: 0, startTop: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const { registerWindow, minimizeWindow, restoreWindow, windows, closeWindow, getZIndex } = useWindowManager();


  const isMin = windows.find(w => w.id === id)?.minimized;
  const [isVisible, setIsVisible] = useState(!isMin);
  const { focusedWindowId, setFocusedWindowId } = useWindowManager();

  const isFocused = focusedWindowId === id;

 
  useEffect(() => {
    registerWindow(id, title, icon);
  }, [id, title, icon, registerWindow]);

  const startResizing = (e, type) => {
    e.stopPropagation();
    e.preventDefault();
    resizeRef.current = {
      type,
      startX: e.clientX,
      startY: e.clientY,
      startW: size.width,
      startH: size.height,
      startLeft: position.x,
      startTop: position.y,
    };
    setReadSize({ width: size.width, height: size.height });
    setIsResizing(true);
    onResizing(true);

  };


  useEffect(() => {
    if (exitFlag) {
      closeWindow(id)
    }
  }, [exitFlag])


  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const mouseX = Math.min(
        Math.max(e.clientX, containerBounds.current.left),
        containerBounds.current.right
      );

      const mouseY = Math.min(
        Math.max(e.clientY, containerBounds.current.top),
        containerBounds.current.bottom
      );

      const newX = mouseX - containerBounds.current.left - offset.current.x;
      const newY = mouseY - containerBounds.current.top - offset.current.y;

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleResize = (e) => {
      if (!isResizing) return;
      if (!isResizable) return;


      const dx = e.clientX - resizeRef.current.startX;
      const dy = e.clientY - resizeRef.current.startY;
      let newWidth = resizeRef.current.startW;
      let newHeight = resizeRef.current.startH;
      let newLeft = resizeRef.current.startLeft;
      let newTop = resizeRef.current.startTop;

      switch (resizeRef.current.type) {
        case 'right':
          newWidth = Math.max(Number.parseInt(minWidth), resizeRef.current.startW + dx);
          break;
        case 'left':
          newWidth = Math.max(Number.parseInt(minWidth), resizeRef.current.startW - dx);
          newLeft = resizeRef.current.startLeft + dx;
          break;
        case 'bottom':
          newHeight = Math.max(Number.parseInt(minHeight), resizeRef.current.startH + dy);
          break;
        case 'top':
          newHeight = Math.max(Number.parseInt(minHeight), resizeRef.current.startH - dy);
          newTop = resizeRef.current.startTop + dy;
          break;
        case 'bottom-right':
          newWidth = Math.max(Number.parseInt(minWidth), resizeRef.current.startW + dx);
          newHeight = Math.max(Number.parseInt(minHeight), resizeRef.current.startH + dy);
          break;
      }


      // Snap to nearest 10px
      newWidth = Math.max(Number.parseInt(minWidth), Math.round(newWidth / 10) * 10);
      newHeight = Math.max(Number.parseInt(minHeight), Math.round(newHeight / 10) * 10);
      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newLeft, y: newTop });
    };

    const stopResize = () => {
      setIsResizing(false);
      onResizing(false);

    }
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);


  const handleMouseDown = (e) => {
    const containerRect = frameRef.current.parentElement.getBoundingClientRect();
    const frameRect = frameRef.current.getBoundingClientRect();

    offset.current = {
      x: e.clientX - frameRect.left,
      y: e.clientY - frameRect.top,
    };
    containerBounds.current = containerRect;
    setIsDragging(true);
  };
  const handleTerminalClose = () => {
    setIsVisible(false);
    if (frameRef.current) {
      frameRef.current.style.display = 'none';
    }

    closeWindow(id);
  }


  const handleMinimize = () => {
    minimizeWindow(id);
  };

  const handleMaximize = () => {
    if (!isResizable) return;
    setIsMaximized((prev) => {
      const maximizing = !prev;

      // Apply styles immediately
      if (maximizing) {
        frameRef.current.style.top = '0';
        frameRef.current.style.left = '0';
        frameRef.current.style.width = '100%';
        frameRef.current.style.height = '88%';
      } else {
        frameRef.current.style.top = `${position.y}px`;
        frameRef.current.style.left = `${position.x}px`;
        frameRef.current.style.width = `${size.width}px`;
        frameRef.current.style.height = `${size.height}px`;
      }

      // Wait for DOM to apply styles, then update readSize
      requestAnimationFrame(() => {
        const rect = frameRef.current.getBoundingClientRect();
        setReadSize({ width: rect.width, height: rect.height });
      });

      return maximizing;
    });
  };

  useEffect(() => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (rect) {
      setReadSize({ width: rect.width, height: rect.height });
    }
  }, [size]);

  const handleAtFront = () => {
    console.log('hello')
    setIsAtFront(true);
    if (!frameRef.current) return;

    if (isAtFront) {
      frameRef.current.style.Zindex = "20"
    }
    else {
      frameRef.current.style.Zindex = "10"
    }

  }


  const handleFocus = () => {
    setFocusedWindowId(id);
  };

  return (

    <div
      ref={frameRef}
      className="simple-frame absolute bg-white rounded-md shadow-[0px_0px_20px_black]"
      
      style={{

        zIndex: getZIndex(id),
        left: position.x, top: position.y, width: size.width,
        height: size.height, display: isMin ? 'none' : 'block',
      }}
      onClick={handleFocus} onMouseDown={handleFocus}
    >
      {/* Corner resizer */}
      
      <div className="resize-handle bottom-right" onMouseDown={(e) => startResizing(e, 'bottom-right')} />

      {/* Edge resizers */}
      <div className="resize-handle top" onMouseDown={(e) => startResizing(e, 'top')} />
      <div className="resize-handle bottom" onMouseDown={(e) => startResizing(e, 'bottom')} />
      <div className="resize-handle left" onMouseDown={(e) => startResizing(e, 'left')} />
      <div className="resize-handle right" onMouseDown={(e) => startResizing(e, 'right')} />

      <div
        className="top-bar flex items-center justify-between text-[#3A3A3A] rounded-t-md"
        onMouseDown={handleMouseDown}
        style={{ background: 'linear-gradient(to bottom, #F9F9F9, #CCCCCC)', padding: '0px 12px' }}
      >
        <div className="closing-buttons flex gap-x-2 items-center py-2">
          <div className="mac-dot red" onClick={handleTerminalClose}></div>
          <div className="mac-dot yellow" onClick={handleMinimize}></div>
          <div className="mac-dot green" onClick={handleMaximize}></div>
        </div>
        {showDimensions ? (
          <span className="title select-none" draggable={false}>{`${title} ${Math.round(readSize.height / 10)} × ${Math.round(readSize.width / 10)}`}</span>

        ) : (
          <span className="title select-none">{title}</span>
        )}
        {hasDrawer ? (
          <button className="drawer-toggle rounded-lg w-7 h-3 outline outline-gray-400"
            style={{ background: "linear-gradient(to bottom, #b2b2b2, #e1e1e1)", boxShadow: "inset 0px -1px 3px 0px #e1e1e1" }}
            onClick={(e) => {
              setIsSidebarOpen(!isSidebarOpen)
            }}

          ></button>
        ) : (
          <div className="w-16"></div>
        )}
      </div>

      <div className="content overflow " style={{
        padding: hasPadding ? "4px" : "0px", background: optionalBackground ? `url(${optionalBackground})` : 'none',
        overflowY: setOverflowY ? `auto` : 'none',
        height: "calc(100% - 24px)",
        flexGrow: 1,
      }}>
        {children}
      </div>

      <div className="corner h-4 w-4 bg-gray absolute right-0 bottom-0">
        <img src={cornerStone} className="h-full" />
      </div>
    </div>
  );
};

export default SimpleFrame;
