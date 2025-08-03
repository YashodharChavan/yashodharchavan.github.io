import React, { useEffect, useState } from 'react';
import '../index.css';
import { useWindowManager } from '../context/WindowManagerContext';
import background from '../assets/background.avif';
import TopBar from './TopBar';
import Taskbar from './Taskbar';
import hardDrive from '../assets/folders/Hard Drive.avif';
import genericFolder from '../assets/folders/GenericFolderIcon.avif';
import Terminal from './Terminal';
import Calculator from './Calculator';
import Contacts from './Contacts';
import TextEdit from './TextEdit';
import Dictionary from './Dictionary';
import Safari from './Safari';
import Mail from './Mail';
import Dashboard from './Dashboard';
import Xcode from './Xcode';
import AboutMe from './AboutMe';
import Finder from './Finder';
import { rootFileOptions } from './Utils/fileSystem.js';
import { useFileSystem } from '../context/FileSystemContext.jsx';
import txt from '../assets/folders/TXT.avif';
import MenuContext from './MenuContext.jsx';


const Desktop = () => {

  const { pendingNewItem, setPendingNewItem, fileSystem, addItemAtPath, deleteNodeAtPath } = useFileSystem();
  const [desktopFileTree, setDesktopFileTree] = useState({});

  const [icons, setIcons] = useState([]);
  const [positions, setPositions] = useState({});
  const [draggedId, setDraggedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);
  const [currentTopComponent, setCurrentTopComponent] = useState(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ left: null, top: null });
  const [newItemName, setNewItemName] = useState('');
  // Find first empty position in the 45 grid slots
  const usedPositions = new Set(Object.values(positions));
  const firstAvailableSlot = Array.from({ length: 45 }).findIndex((_, i) => !usedPositions.has(i));
  const pendingNewItemPosition = firstAvailableSlot === -1 ? 0 : firstAvailableSlot;

  useEffect(() => {
    const updatedTree = fileSystem?.['/']?.['children']?.['Users']?.['children']?.['yashodhar']?.['children']?.['Desktop']?.['children'] || {};
    setDesktopFileTree(updatedTree);
  }, [fileSystem]);

  const handleNameSubmit = () => {

    console.log('reaching here')
    const name = newItemName.trim();
    if (!name) {
      setPendingNewItem(null);
      return;
    }

    const node = fileSystem['/']?.children?.Users?.children?.yashodhar?.children?.Desktop;
    if (!node || node.children[name]) {
      alert("Item with this name already exists!");
      setPendingNewItem(null);
      return;
    }

    const type = pendingNewItem.type === 'folder' ? 'dir'
      : pendingNewItem.type === 'file' ? 'file'
        : pendingNewItem.type === 'burn' ? 'burn'
          : 'file';

    addItemAtPath(
      fileSystem,
      ['/', 'Users', 'yashodhar', 'Desktop'],
      name,
      {
        type,
        ...(type === 'dir' || type === 'burn' ? { children: {} } : { content: '' }),
        icon: rootFileOptions.find(opt => opt.label === type || opt.label === '.txt')?.icon,
      }
    );
    setPendingNewItem(null);
    setNewItemName('');
  };

  React.useEffect(() => {
    console.log(fileSystem)
  }, [fileSystem])

  const handleAddNewItem = (type) => {
    const newItem = {
      id: Date.now(),
      name: '',
      type, // 'file', 'folder', or 'burn-folder'
      isEditing: true,
      path: '/Users/yashodhar/Desktop',
    };
    setPendingNewItem(newItem);
  };
  useEffect(() => {
    const handleClick = () => {
      setContextMenuPosition({ left: null, top: null });
    };

    window.addEventListener("click", handleClick);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);


  const getIconForNode = (name, type) => {
    if (type === 'burn') {
      return rootFileOptions.find(opt => opt.label === 'burn')?.icon;
    }
    if (type === 'dir') {
      // Prevent matching name === "burn" to burn icon when type is only 'dir'
      const nameLower = name.toLowerCase();
      if (nameLower === 'burn') return genericFolder;

      const match = rootFileOptions.find(opt => opt.label.toLowerCase() === nameLower);
      return match ? match.icon : genericFolder;
    } else if (type === 'file') {
      const extension = '.' + name.split('.').pop().toLowerCase();
      if (extension === '.md') {
        const mdMatch = rootFileOptions.find(opt => opt.label === '.md');
        return mdMatch.icon;
      }
      else if (extension === '.pdf') {
        const pdfMatch = rootFileOptions.find(opt => opt.label === '.pdf');
        return pdfMatch.icon;
      }
      else if (extension === '.bin') {
        const binMatch = rootFileOptions.find(opt => opt.label === '.bin');
        console.log(binMatch)
        return binMatch.icon;
      }
      else if (extension === '.zip') {
        const zipMatch = rootFileOptions.find(opt => opt.label === '.zip');
        return zipMatch.icon;
      }
      else if (extension === '.html' || extension === '.css' || extension === '.js' || extension === '.jsx') {
        const htmlMatch = rootFileOptions.find(opt => opt.label === '.html');
        return htmlMatch.icon;
      }
      else if (extension === '.avif') {
        const icoMatch = rootFileOptions.find(opt => opt.label === '.avif');
        return icoMatch.icon;
      }
      return txt;
    }
    return txt;
  };

  useEffect(() => {
    let initialIcons = [];
    if (Object.keys(desktopFileTree).length === 0) {
      initialIcons = [];
    } else {
      initialIcons = Object.keys(desktopFileTree).map((key, index) => {
        const node = desktopFileTree[key];
        return {
          id: String(index),
          name: key,
          type: node.type,
          src: getIconForNode(key, node.type),
        };
      });
    }

    const initialPositions = {};
    initialIcons.forEach((icon, index) => {
      initialPositions[icon.id] = index;
    });

    setIcons(initialIcons);
    setPositions(initialPositions);
  }, [JSON.stringify(desktopFileTree)]);

  const { openWindows, openWindow, optionalText, optionalTitle, optionalPath, optionalTextEditPath } = useWindowManager();

  const handleDragStart = (id, e) => {
    const icon = icons.find((i) => i.id === id);
    if (icon) {
      e.dataTransfer.setData('text/plain', icon.name); // Set the icon name
      e.dataTransfer.setData('fullPath', '/Users/yashodhar/Desktop'); // Set the full path
      e.dataTransfer.effectAllowed = 'move';
      setDraggedId(id);
    }
  };

  const handleContextMenu = (event) => {
    event.preventDefault();

    const menuWidth = 200;  // estimated width of the context menu
    const menuHeight = 200; // estimated height of the context menu

    const boundingRect = event.currentTarget.getBoundingClientRect(); // container (desktop) bounds
    let left = event.clientX - boundingRect.left;
    let top = event.clientY - boundingRect.top;

    // Flip to left if not enough horizontal space
    if (left + menuWidth > boundingRect.width) {
      left = boundingRect.width - menuWidth;
    }

    // Flip upward if not enough vertical space
    if (top + menuHeight > boundingRect.height) {
      top = boundingRect.height - menuHeight;
    }

    // Clamp to non-negative values just in case
    left = Math.max(0, left);
    top = Math.max(0, top);

    setContextMenuPosition({ left, top });
  };


  const handleDragEnd = () => {
    setDraggedId(null);
    setDropTargetId(null);
  };

  const handleDragOver = (index, e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetId(index);
  };

  const handleDragEnter = (index, e) => {
    e.preventDefault();
    setDropTargetId(index);
  };

  const handleDragLeave = (index, e) => {
    e.preventDefault();
    setDropTargetId(null);
  };

  const handleDrop = (targetIndex, e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');

    if (draggedId === null) {
      setDraggedId(null);
      setDropTargetId(null);
      return;
    }

    const draggedPosition = positions[draggedId];
    if (draggedPosition === undefined || draggedPosition === targetIndex) {
      setDraggedId(null);
      setDropTargetId(null);
      return;
    }

    const targetIconId = Object.keys(positions).find(
      (id) => positions[id] === targetIndex
    );

    const updatedPositions = { ...positions };

    if (targetIconId) {
      updatedPositions[draggedId] = targetIndex;
      updatedPositions[targetIconId] = draggedPosition;
    } else {
      updatedPositions[draggedId] = targetIndex;
    }

    setPositions(updatedPositions);
    setDraggedId(null);
    setDropTargetId(null);
  };

  const handleDoubleClick = (icon) => {
    const fileNode = desktopFileTree[icon.name];

    if (icon.type === 'dir' || icon.type === 'burn') {
      openWindow('finder', '', '', '', icon.name, `/Users/yashodhar/Desktop/${icon.name}`);
    } else if (icon.type === 'file') {
      if (icon.name.split('.').pop().toLowerCase() === 'pdf') {
        const href = fileNode?.href || '';
        openWindow('safari', '', '', '', icon.name, href);
      } else {
        openWindow('textedit', '', '', fileNode?.content || '', icon.name);
      }
    }
  };


  const getIconAtPosition = (position) => {
    const iconId = Object.keys(positions).find(
      (id) => positions[id] === position
    );
    return iconId !== undefined ? icons.find((icon) => icon.id === iconId) : null;
  };

  const handleTrashDrop = (e, iconId) => {
    const icon = icons.find((i) => i.id === iconId);
    if (!icon) return;
    const fullPath = `/Users/yashodhar/Desktop/${icon.name}`;
    deleteNodeAtPath(fullPath);
  };

  return (
    <>
      <TopBar currentTopComponent={currentTopComponent} />
      <div
        className='desktop h-full relative'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='actual-icons-space h-[88%] w-full grid grid-cols-9 grid-rows-5 gap-x-4 gap-y-4 p-4 relative' onContextMenu={(e) => handleContextMenu(e)}>
          <MenuContext position={contextMenuPosition} source={'desktop'} onAddItem={handleAddNewItem} currentPath={'/Users/yashodhar/Desktop'} />
          {Array.from({ length: 45 }).map((_, index) => {
            const icon = getIconAtPosition(index);

            return (
              <div
                key={index}
                className={`icon-container flex flex-col items-center justify-center p-1 w-full h-full ${dropTargetId === index ? 'bg-[#7c7c7c8c] rounded' : ''
                  }`}
                onDragOver={(e) => handleDragOver(index, e)}
                onDragEnter={(e) => handleDragEnter(index, e)}
                onDragLeave={(e) => handleDragLeave(index, e)}
                onDrop={(e) => handleDrop(index, e)}
              >
                {icon && (
                  <>
                    <img
                      src={icon.src}
                      alt={`${icon.name} Icon`}
                      className={`h-16 w-16 ${draggedId === icon.id ? 'opacity-50' : 'opacity-100'}`}
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        handleDragStart(icon.id, e);
                      }}
                      onDragEnd={handleDragEnd}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        handleDoubleClick(icon);
                      }}
                    />
                    <span
                      className='text-xs mt-1 text-white select-none text-shadow-2xs'
                      style={{
                        textShadow: '0 0 2px black, 0 0 4px black',
                      }}
                    >
                      {icon.name}
                    </span>
                  </>
                )}

                {pendingNewItem?.path &&
                  pendingNewItem.path.replace(/^\/?/, '/') === '/Users/yashodhar/Desktop' &&
                  index === pendingNewItemPosition && (
                    <div className="flex flex-col items-center justify-center p-2">
                      <img
                        src={
                          pendingNewItem.icon ||
                          (pendingNewItem.type === 'folder'
                            ? rootFileOptions.find(opt => opt.label === 'home')?.icon
                            : rootFileOptions.find(opt => opt.label === '.txt')?.icon)
                        }
                        alt="New"
                        className="w-12 h-12"
                      />
                      <input
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onBlur={handleNameSubmit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleNameSubmit();
                          if (e.key === 'Escape') setPendingNewItem(null);
                        }}
                        className="text-sm text-center mt-1 border rounded-4xl px-1 text-white outline-none w-11/12"
                        autoFocus
                      />
                    </div>
                  )}


              </div>
            );
          })}
        </div>
        {openWindows['terminal'] && <Terminal />}
        {openWindows['calculator'] && <Calculator />}
        {openWindows['contacts'] && <Contacts />}
        {openWindows['textedit'] && <TextEdit title={optionalTitle} optionalText={optionalText} optionalPath={optionalTextEditPath} />}
        {openWindows['dictionary'] && <Dictionary />}
        {openWindows['safari'] && <Safari />}
        {openWindows['mail'] && <Mail />}
        {openWindows['dashboard'] && <Dashboard />}
        {openWindows['xcode'] && <Xcode />}
        {openWindows['aboutme'] && <AboutMe />}
        {openWindows['finder'] && <Finder optionalPath={optionalPath} />}
      </div>
      <Taskbar
        setCurrentTopComponent={setCurrentTopComponent}
        handleTrashDrop={handleTrashDrop}
      />
    </>
  );
};

export default Desktop;