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
        height: "95%", 
        width: "100%"
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
  const [currentFileName, setCurrentFileName] = useState('index.html')

  const startResizing = (e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
  };


  useEffect(() => {
    fetch(currentFileURL).then(res => res.text()).then(setFileContent)
    setCurrentFileName(currentFileURL.split('/').pop())
    
  }, [currentFileURL])







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
      minWidth="400"
      minHeight="300"
      isResizable={true}
      hasPadding={false}
      hasDrawer={false}
      showDimensions={false}
    >
      <div ref={containerRef} className="xcode flex w-full h-full">


        <div className="sidebar h-full overflow-hidden whitespace-nowrap text-ellipsis bg-red-400 flex flex-col overflow-y-scroll scrollbar-hide" style={{ width: sidebarWidth }}>

          {/* <div className="folder flex gap-x-1 items-center px-2 py-1 hover:bg-red-300 cursor-default">
            <img src={genericFolder} alt="" className="h-5 w-5 flex-shrink-0" />
            <p
              className="overflow-hidden whitespace-nowrap text-ellipsis text-sm"
              style={{ maxWidth: '100%' }}
              title="mac-os-10.4-X-Tiger"
            >
            </p>

          </div> */}

          <Folder currentFileURL={currentFileURL} setCurrentFileURL={setCurrentFileURL} />


        </div>
        <div className="w-1.5 h-full bg-white cursor-col-resize flex justify-center items-center"
          onMouseDown={startResizing}
        >.</div>
        <div className="code-section w-full h-full overflow-y-hidden bg-blue-400">
          <div className="bg-white w-fit-h-fit border rounded-md" style={{padding: "2px 4px"}}>{currentFileName}</div>
          <CodeViewer content={fileContent} />
        </div>

      </div>
    </SimpleFrame>
  )
}

export default Xcode