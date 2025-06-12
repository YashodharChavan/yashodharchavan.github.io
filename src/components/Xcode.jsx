import React, { useEffect, useState, useRef } from 'react'
import SimpleFrame from './SimpleFrame'
import './component.css'
import Folder from './Folder'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';


function CodeViewer({ content, language }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={coy} // white/light theme
      showLineNumbers={true}
      wrapLines={true}
      customStyle={{
        background: 'white',
        fontSize: '14px',
        height: "96%",
        width: "100%",
        whiteSpace: 'pre-wrap',
        fontFamily: 'Monaco'    // Forces wrapping
      }}
    >
      {content}
    </SyntaxHighlighter>
  );
}


const Xcode = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200); // Initial width in px
  const isResizing = useRef(false);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const COLLAPSE_THRESHOLD = 100;
  const [fileContent, setFileContent] = useState('');
  const [currentFileURL, setCurrentFileURL] = useState('')
  const [currentFileName, setCurrentFileName] = useState()
  const [imageURL, setImageURL] = useState()
  const [isSVG, setIsSVG] = useState(false)

  const startResizing = (e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
  };


  useEffect(() => {
    if (!currentFileURL) return;

    const fileExt = currentFileURL.split('.').pop().toLowerCase();

    if (['png', 'jpg', 'jpeg', 'gif', 'ico', 'bmp', 'webp'].includes(fileExt)) {
      // Binary image file
      setIsSVG(false)
      fetch(currentFileURL)
        .then(res => res.blob())
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob);
          setFileContent(`<img src="${imageUrl}" alt="Image file" />`);
          setCurrentFileName(currentFileURL.split('/').pop());
          setImageURL(imageUrl);
        });
    } else if (['svg'].includes(fileExt)) {
      fetch(currentFileURL)
        .then(res => res.text())
        .then(text => {
          setFileContent(text);
          setCurrentFileName(currentFileURL.split('/').pop());
          setIsSVG(true)
        });
    } else {
      setImageURL('')
      setIsSVG(false)
      fetch(currentFileURL)
        .then(res => res.text())
        .then(text => {
          setFileContent(text);
          setCurrentFileName(currentFileURL.split('/').pop());
        });
    }
  }, [currentFileURL]);







  const stopResizing = () => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    const deltaX = e.clientX - startX.current;
    const newWidth = startWidth.current + deltaX;

    // Collapse if under threshold
    if (newWidth < COLLAPSE_THRESHOLD) {
      setSidebarWidth(0);
    } else if (newWidth <= 400) {
      setSidebarWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);
  return (
    <SimpleFrame
      title="Xcode"
      id="xcode"
      icon="xcode"
      height="450"
      width="700"
      minWidth="600"
      minHeight="400"
      isResizable={true}
      hasPadding={false}
      hasDrawer={false}
      showDimensions={false}
    >
      <div ref={containerRef} className="xcode flex w-full h-full">


        <div className="sidebar h-full overflow-hidden whitespace-nowrap text-ellipsis flex flex-col overflow-y-scroll scrollbar-hide" style={{ width: sidebarWidth }}>

          <Folder currentFileURL={currentFileURL} setCurrentFileURL={setCurrentFileURL} />


        </div>
        <div className="w-1.5 h-full bg-[#D8D8D8] cursor-col-resize flex justify-center items-center"
          onMouseDown={startResizing}
        ></div>
        <div className="code-section w-full h-full overflow-y-hidden">

          {currentFileName && <div className="bg-white w-fit h-fit border rounded-md select-none" style={{ padding: "4px 8px", margin: "0px 28px" }}>{currentFileName}</div>
          }


          {(imageURL && !isSVG) && <img draggable={false} src={imageURL} alt="Image file" style={{ maxWidth: "100%", maxHeight: "100%", margin: 'auto auto' }} />}
          {isSVG && (
            <div
              className="svg-container"
              dangerouslySetInnerHTML={{ __html: fileContent }}
              style={{ width: "100%", height: '100%', overflow: 'auto', padding: '12px' }}
            />
          )}
          {(!imageURL && !isSVG) && <CodeViewer content={fileContent} />}
        </div>

      </div>
    </SimpleFrame>
  )
}

export default Xcode