import React, { useRef, useState, useEffect } from 'react';
import './component.css';
import cornerStone from '../assets/cornerStone.svg';

const SimpleFrame = ({ title, children, hasDrawer }) => {
  const frameRef = useRef(null);
  const containerBounds = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

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

  return (
    <div
      ref={frameRef}
      className="simple-frame absolute z-10 bg-white rounded-md shadow-[0px_0px_20px_black] h-80 w-1/2"
      style={{ left: position.x, top: position.y }}
    >
      <div
        className="top-bar flex items-center justify-between text-[#3A3A3A] rounded-t-md cursor-move"
        onMouseDown={handleMouseDown}
        style={{ background: 'linear-gradient(to bottom, #F9F9F9, #CCCCCC)', padding: '0px 12px' }}
      >
        <div className="closing-buttons flex gap-x-2 items-center py-2">
          <div className="mac-dot red"></div>
          <div className="mac-dot yellow"></div>
          <div className="mac-dot green"></div>
        </div>
        <span className="title select-none">{title}</span>
        {hasDrawer ? (
          <button className="drawer-toggle bg-gray-600 p-1 rounded">≡</button>
        ) : (
          <div className="w-16"></div>
        )}
      </div>

      <div className="content h-[calc(100%-28px)] overflow-y-auto p-1">
        {children}
      </div>

      <div className="corner h-4 w-4 bg-gray absolute right-0 bottom-0">
        <img src={cornerStone} className="h-full" />
      </div>
    </div>
  );
};

export default SimpleFrame;
