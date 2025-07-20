import React, { useEffect, useState, useRef } from 'react';
import SimpleFrame from './SimpleFrame';
import texture from '../assets/texture.jpg';
import menu from '../assets/menu.svg';
import bars from '../assets/bars.svg';
import genericNetwork from '../assets/folders/GenericNetworkIcon.ico';
import hardDrive from '../assets/folders/Hard Drive.ico';
import Dvd from '../assets/folders/DVD.ico';
import Desktop from '../assets/folders/DesktopFolderIcon.ico';
import Home from '../assets/folders/HomeFolderIcon.ico';
import Applications from '../assets/folders/ToolbarAppsFolderIcon.ico';
import Documents from '../assets/folders/ToolbarDocumentsFolderIcon.ico';
import Movie from '../assets/folders/ToolbarMovieFolderIcon.ico';
import Music from '../assets/folders/ToolBarMusicFolderIcon.ico';
import Pictures from '../assets/folders/ToolbarPicturesFolderIcon.ico';
import FileSystemFolder from './FileSystemFolder.jsx';
import { useFileSystem } from '../context/FileSystemContext.jsx';
import { getNodeAtPath } from './Utils/fileSystemUtils';

const Finder = ({ optionalPath = null }) => {
  const { fileSystem } = useFileSystem();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(150);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const COLLAPSE_THRESHOLD = 100;
  const [iconIndex, setIconIndex] = useState(4);
  const [fileSystemPath, setFileSystemPath] = useState('/');

  const options = [
    { label: 'Network', icon: genericNetwork, path: "/" },
    { label: 'Mac OS X Tiger', icon: hardDrive },
    { label: 'Mac OS X Tiger', icon: Dvd },
    { label: 'Desktop', icon: Desktop },
    { label: 'Yashodhar', icon: Home },
    { label: 'Applications', icon: Applications },
    { label: 'Documents', icon: Documents },
    { label: 'Movies', icon: Movie },
    { label: 'Music', icon: Music },
    { label: 'Pictures', icon: Pictures },
  ];

  const startResizing = (e) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    const deltaX = e.clientX - startX.current;
    const newWidth = startWidth.current + deltaX;

    if (newWidth < COLLAPSE_THRESHOLD) {
      setSidebarWidth(0);
    } else if (newWidth <= 300) {
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

  useEffect(() => {
    if (optionalPath) {
      setFileSystemPath(optionalPath);
    }
  }, [optionalPath]);

  const currentNode = getNodeAtPath(fileSystemPath, fileSystem);

  const pathParts = fileSystemPath === '/' ? ['/'] : fileSystemPath.split('/').filter(part => part !== '');
  const breadcrumbs = pathParts.map((part, index) => {
    const pathUpToIndex = index === 0 && part === '/' ? '/' : `/${pathParts.slice(0, index + 1).join('/')}`;
    return { label: part || '/', path: pathUpToIndex };
  });

  return (
    <SimpleFrame
      title={`Finder - ${fileSystemPath}`}
      id="finder"
      icon="finder"
      height="450"
      width="800"
      minHeight="300"
      minWidth="550"
      isResizable={true}
      showDimensions={false}
      hasPadding={false}
      optionalBackground={texture}
      hasDrawer={true}
      setIsSidebarOpen={setIsSidebarOpen}
      isSidebarOpen={isSidebarOpen}
    >
      {isSidebarOpen && (
        <div className="top-finder-bar w-full flex justify-between items-center" style={{ paddingBottom: isSidebarOpen ? '12px' : '0px', padding: "4px", background: 'linear-gradient(rgb(204, 204, 204), rgb(213, 213, 213))' }}>
          <div className="left-finder-side flex select-none gap-x-2 items-center">
            <div
              className="buttons w-fit h-fit outline outline-[#666666] rounded-sm"
              style={{ background: 'linear-gradient(to bottom, #f2f2f2 0%, #d9d9d9 100%)' }}
            >
              <button className="h-full text-sm w-9 bg-transparent text-inherit" onClick={(e) => setFileSystemPath(fileSystemPath.substring(0, fileSystemPath.lastIndexOf('/')))}>&lt;</button>
              <button className="h-full w-9 bg-transparent border-l border-[#666666] text-inherit">&gt;</button>
            </div>

            <div
              className="buttons w-fit h-fit outline select-none outline-[#666666] rounded-sm"
              style={{ background: 'linear-gradient(to bottom, #f2f2f2 0%, #d9d9d9 100%)' }}
            >
              <button className="h-full text-sm w-9 bg-transparent text-inherit">
                <img src={menu} className="w-2/5" draggable={false} style={{ margin: 'auto auto' }} />
              </button>
              <button className="h-full w-9 bg-transparent border-l border-[#666666] text-inherit">
                <img src={bars} className="w-2/5" draggable={false} style={{ margin: 'auto auto' }} />
              </button>
            </div>
          </div>

          <div className="right-finder-side">
            <input
              type="text"
              placeholder="search"
              className="bg-white border border-gray-400 rounded-2xl w-60 shadow-[inset_0px_2px_1px_0px_#cfcfcf] focus:outline-none"
              style={{ padding: '0px 12px' }}
            />
          </div>
        </div>
      )}

      <div
        className="finder flex w-full"
        style={{ height: isSidebarOpen ? 'calc(100% - 38px)' : '100%', padding: "4px" }}
      >
        {isSidebarOpen && (
          <>
            <div
              className="sidebar h-full overflow-hidden whitespace-nowrap select-none text-ellipsis flex flex-col overflow-y-scroll scrollbar-hide bg-white outline-gray-500 outline"
              style={{ width: sidebarWidth }}
            >
              {options.map((element, index) => (
                <div
                  key={index}
                  className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]"
                  style={{
                    padding: '2px 4px',
                    background: iconIndex === index ? 'linear-gradient(to top, #005DCC 0%, #4098E2 100%)' : '',
                    color: iconIndex === index ? 'white' : '',
                  }}
                  onClick={() => {
                    setIconIndex(index);
                    const labelToPathMap = {
                      'Macintosh HD': '/',
                      'Yashodhar': '/Users/yashodhar',
                      'Desktop': '/Users/yashodhar/Desktop',
                      'Applications': '/Applications',
                      'Documents': '/Users/yashodhar/Documents',
                      'Movies': '/Users/yashodhar/Movies',
                      'Music': '/Users/yashodhar/Music',
                      'Pictures': '/Users/yashodhar/Pictures',
                    };
                    const newPath = labelToPathMap[element.label] || element.path || '/';
                    setFileSystemPath(newPath);
                  }}
                >
                  <img src={element.icon} alt="" className="h-8 w-8" />
                  <p className="text-sm">{element.label}</p>
                  {index === 2 && <hr />}
                </div>
              ))}
            </div>
            <div
              className="w-1.5 h-full cursor-col-resize flex justify-center items-center"
              onMouseDown={startResizing}
            ></div>
          </>
        )}

        <div className="code-section bg-white w-full h-full overflow-y-auto outline-gray-500 outline">
          <div className="breadcrumb flex items-center p-2 border-b select-none border-gray-300">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <span
                  className="text-sm text-blue-600 hover:underline cursor-pointer"
                  onClick={() => setFileSystemPath(crumb.path)}
                >
                  {crumb.label}
                </span>
                {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
              </div>
            ))}
          </div>

          {currentNode ? (
            <FileSystemFolder
              node={currentNode}
              path={fileSystemPath}
              setFileSystemPath={setFileSystemPath}

            />
          ) : (
            <div className="p-4 text-gray-500">Directory not found</div>
          )}
        </div>
      </div>
    </SimpleFrame>
  );
};

export default Finder;