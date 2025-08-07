import React, { useEffect, useState, useRef, memo } from 'react';
import SimpleFrame from './SimpleFrame';
import texture from '../assets/texture.avif';
import menu from '../assets/menu.svg';
import bars from '../assets/bars.svg';
import genericNetwork from '../assets/folders/GenericNetworkIcon.avif';
import hardDrive from '../assets/folders/Hard Drive.avif';
import Dvd from '../assets/folders/DVD.avif';
import Desktop from '../assets/folders/DesktopFolderIcon.avif';
import Home from '../assets/folders/HomeFolderIcon.avif';
import Applications from '../assets/folders/ToolbarAppsFolderIcon.avif';
import Documents from '../assets/folders/ToolbarDocumentsFolderIcon.avif';
import Movie from '../assets/folders/ToolbarMovieFolderIcon.avif';
import Music from '../assets/folders/ToolBarMusicFolderIcon.avif';
import Pictures from '../assets/folders/ToolbarPicturesFolderIcon.avif';
import FileSystemFolder from './FileSystemFolder.jsx';
import { useFileSystem } from '../context/FileSystemContext.jsx';
import { getNodeAtPath, getIconForItem } from './Utils/fileSystemUtils';
import settings from '../assets/icons/settings.svg';
import { useWindowManager } from '../context/WindowManagerContext.jsx';
// import { finderMenu } from './Utils/menuConfig.js';
import MenuContext from './MenuContext.jsx';
import burn from '../assets/folders/burnableFolder.avif'
import './component.css'

const SearchResultsDropdown = ({ results, onItemClick, onClose, selectedIndex, setSelectedIndex }) => {

  const dropdownRef = useRef(null);
  // Handle keyboard navigation
  // In SearchResultsDropdown component
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          onItemClick(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        // Return focus to the input after closing
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, onItemClick, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);


  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden"
      style={{
        maxHeight: '270px',
        maxWidth: '244px',
        overflowY: 'auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
    >
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li
              key={`${result.path}-${index}`}
              className={`flex items-center px-4 py-3 cursor-pointer ${index === selectedIndex ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
              onClick={() => onItemClick(result)}
            >
              <div className="flex-shrink-0 mr-3">
                <img
                  src={getIconForItem(result.name, result.type)}
                  alt={result.name}
                  className="w-8 h-8"
                />
              </div>
              <div className="flex-grow">
                <div className="font-medium text-gray-900">{result.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {result.path.replace(/^\/Users\/[^/]+/, '~')}
                </div>
              </div>
              {result.type === 'file' && (
                <div className="text-xs text-gray-400 ml-2">
                  {result.name.split('.').pop().toUpperCase()}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 py-3 text-gray-500">No results found</div>
      )}
    </div>
  );
};


const Finder = ({ optionalPath = null }) => {
  const { openWindow } = useWindowManager();
  const { fileSystem, setPendingNewItem, currentPath } = useFileSystem();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(150);
  const [isMenuOptionOpen, setIsMenuOptionOpen] = useState(false);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const COLLAPSE_THRESHOLD = 100;
  const [iconIndex, setIconIndex] = useState(4);
  const [fileSystemPath, setFileSystemPath] = useState('/');
  const [position, setPosition] = useState({ left: null, top: null })
  const [fileSystemItems, setFileSystemItems] = useState([]);
  const dropdownRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Function to search within current directory and its children
  const searchInDirectory = (query, node, currentPath) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const results = [];
    const searchNode = node || getNodeAtPath(currentPath, fileSystem);

    if (!searchNode) return [];

    // Search in current directory's children
    Object.entries(searchNode.children || {}).forEach(([name, child]) => {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          name,
          type: child.type,
          href: child.href || null,
          path: currentPath === '/' ? `/${name}` : `${currentPath}/${name}`
        });
      }

      // If it's a directory, search recursively
      if (child.type === 'dir' || child.type === 'burn') {
        const childPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
        const childResults = searchInDirectory(query, child, childPath);
        results.push(...childResults);
      }
    });

    return results;
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      setIsSearchActive(true); // Ensure dropdown stays open when typing
      const results = searchInDirectory(query, null, fileSystemPath);
      setSearchResults(results.map(result => ({
        ...result,
        fullPath: result.path
      })));
    } else {
      setSearchResults([]);
    }
  };
  useEffect(() => {
    // When component unmounts or search becomes inactive
    if (!isSearchActive) {
      setSearchQuery('');
      setSearchResults([]);
      setSelectedIndex(0);
    }
  }, [isSearchActive]);

  const finderMenu = [
    {
      label: "New Folder",
      action: () =>
        setPendingNewItem({
          type: "folder",
          path: fileSystemPath,
        }),
    },
    {
      label: "New File",
      action: () =>
        setPendingNewItem({
          type: "file",
          path: fileSystemPath,
        }),
    },
    {
      label: "New Burn Folder",
      action: () =>
        setPendingNewItem({
          type: "burn",
          path: fileSystemPath,
          icon: burn,
        }),
    },
    {
      label: "Get Info",
      action: () => console.log("Get info"),
    },
  ];
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

  const handleAddNewItem = (type) => {
    const newItem = {
      id: Date.now(),
      name: '',
      type: type, // 'file', 'folder', or 'burn-folder'
      isEditing: true,
      path: fileSystemPath,
    };
    setFileSystemItems((prev) => [...prev, newItem]);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - boundingRect.left;
    const clickY = event.clientY - boundingRect.top;
    console.log(clickX, clickY)
    const menuWidth = 160;

    let left = clickX;
    let top = clickY
    // Flip to left side of cursor if near right edge
    if (clickX + menuWidth > boundingRect.width) {
      left = clickX - menuWidth;
    }

    if (clickY + menuWidth > boundingRect.height) {
      top = clickY - menuWidth
    }

    setPosition({ left, top });
  };


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
    const handleClick = () => {
      // Close the menu when user clicks anywhere else
      setPosition({ left: null, top: null });
    };

    window.addEventListener("click", handleClick);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOptionOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsMenuOptionOpen(false);
      }
    };

    if (isMenuOptionOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOptionOpen]);

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

  const handleFileSystemBackward = () => {
    if (fileSystemPath === '/') return;

    // Remove the trailing slash if it exists
    let trimmedPath = fileSystemPath.endsWith('/') ? fileSystemPath.slice(0, -1) : fileSystemPath;

    // Get the parent path
    const parentPath = trimmedPath.substring(0, trimmedPath.lastIndexOf('/') + 1);

    // If nothing left, fallback to root
    setFileSystemPath(parentPath || '/');
  };

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
        <div className="top-finder-bar w-full flex justify-between items-center relative" style={{ paddingBottom: isSidebarOpen ? '12px' : '0px', padding: "4px", background: 'linear-gradient(rgb(204, 204, 204), rgb(213, 213, 213))' }}>
          <div className="left-finder-side flex select-none gap-x-2 items-center">
            <div
              className="buttons w-fit h-fit outline outline-[#666666] rounded-sm"
              style={{ background: 'linear-gradient(to bottom, #f2f2f2 0%, #d9d9d9 100%)' }}
            >
              <button className="h-full text-sm w-9 bg-transparent text-inherit" onClick={handleFileSystemBackward}>&lt;</button>
              <button className="h-full w-9 bg-transparent border-l border-[#666666] text-inherit">&gt;</button>
            </div>

            <div
              className="buttons w-fit h-fit outline select-none outline-[#666666] rounded-sm"
              style={{ background: 'linear-gradient(to bottom, #f2f2f2 0%, #d9d9d9 100%)' }}
            >
              <button className="h-full text-sm w-9 bg-transparent text-inherit">
                <img loading='lazy' src={menu} className="w-2/5" draggable={false} style={{ margin: 'auto auto' }} />
              </button>
              <button className="h-full w-9 bg-transparent border-l border-[#666666] text-inherit">
                <img loading='lazy' src={bars} className="w-2/5" draggable={false} style={{ margin: 'auto auto' }} />
              </button>
            </div>

            <div
              className="relative w-fit"
              onMouseEnter={() => setIsMenuOptionOpen(true)}
              onMouseLeave={() => setIsMenuOptionOpen(false)}
            >
              <div
                className="buttons w-fit-h-fit outline select-none outline-[#666666] rounded-sm"
                style={{
                  background: 'linear-gradient(to bottom, #f2f2f2 0%, #d9d9d9 100%)',
                }}
              >
                <button className="h-full text-sm w-9 bg-transparent text-inherit">
                  <img loading='lazy'
                    src={settings}
                    className="w-2/5"
                    draggable={false}
                    style={{ margin: 'auto auto' }}
                  />
                </button>
              </div>

              {/* Menu Dropdown */}
              {isMenuOptionOpen && (
                <div
                  className="absolute bg-transparent shadow-md z-50"
                  style={{ top: '100%', left: '0px', minWidth: "153px", paddingTop: "12px" }}
                  ref={dropdownRef}
                >
                  {finderMenu.map((menuItem, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-2 hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white"
                      style={{ padding: '0px 16px' }}
                      onClick={menuItem.action}
                    >
                      {menuItem.icon && (
                        <img loading='lazy' src={menuItem.icon} alt="" className="h-4" />
                      )}
                      <p>{menuItem.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>


          </div>

          <div className="relative right-finder-side">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              className="bg-white border border-gray-400 rounded-2xl w-60 shadow-[inset_0px_2px_1px_0px_#cfcfcf] focus:outline-none pl-8 pr-4 py-1"
              value={searchQuery}
              style={{ padding: "0px 8px" }}
              onChange={handleSearch}
              onFocus={() => {
                setIsSearchActive(true);
                if (searchQuery) {
                  const results = searchInDirectory(searchQuery, null, fileSystemPath);
                  setSearchResults(results.map(result => ({
                    ...result,
                    fullPath: result.path
                  })));
                }
              }}
            />

            {
              isSearchActive && searchQuery && (
                <SearchResultsDropdown
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  results={searchResults}
                  onItemClick={(result) => {
                    if (result.type === 'dir' || result.type === 'burn') {
                      setFileSystemPath(result.path);
                    }
                    else if (result.type === 'file') {
                      // Check if file is PDF (using proper property access)
                      if (result.name.toLowerCase().endsWith('.pdf')) {
                        openWindow('safari', '', '', '', result.name, result.href);
                      } else {
                        openWindow('textedit', '', '', result.content, result.name);
                      }
                    }
                    else if (result.type === 'app') {
                      openWindow(result.name.split('.')[0].toLowerCase());
                    }
                    setSearchQuery('');
                    setIsSearchActive(false);
                  }}
                  onClose={() => setIsSearchActive(false)}
                />
              )
            }
          </div>
        </div>
      )}

      <div
        className="finder flex w-full"
        style={{ height: isSidebarOpen ? 'calc(100% - 38px)' : '100%', padding: "4px" }}
        onContextMenu={handleContextMenu}
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
                  <img loading='lazy' src={element.icon} alt="" className="h-8 w-8" />
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

        <div className="code-section relative bg-white w-full h-full overflow-y-auto outline-gray-500 outline" onContextMenu={(e) => handleContextMenu(e)}>
          <MenuContext position={position} source={'finder'} onAddItem={handleAddNewItem} currentPath={fileSystemPath} />

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

export default memo(Finder);