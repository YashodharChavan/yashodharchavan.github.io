import React, { useEffect, useState } from 'react';
import '../index.css';
import { useWindowManager } from '../context/WindowManagerContext';
import background from '../assets/background.png';
import TopBar from './TopBar';
import Taskbar from './Taskbar';
import hardDrive from '../assets/folders/Hard Drive.ico';
import genericFolder from '../assets/folders/GenericFolderIcon.ico';
import Terminal from "./Terminal";
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

const Desktop = () => {
  const { fileSystem } = useFileSystem();
  const desktopFileTree = fileSystem?.['/']?.['children']?.['Users']?.['children']?.['yashodhar']?.['children']?.['Desktop']?.['children'] || {};

  const [icons, setIcons] = useState([]);
  const [positions, setPositions] = useState({});
  const [draggedId, setDraggedId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);

  const getIconForNode = (name, type) => {
    if (type === 'dir') {
      const match = rootFileOptions.find(opt => opt.label.toLowerCase() === name.toLowerCase());
      return match ? match.icon : genericFolder;
    } else if (type === 'file') {
      const extension = '.' + name.split('.').pop().toLowerCase();
      const match = rootFileOptions.find(opt => opt.label === extension);
      return match ? match.icon : genericFolder;
    }
    return genericFolder;
  };

  useEffect(() => {
    console.log('Desktop File Tree:', desktopFileTree);

    let initialIcons = [];
    if (Object.keys(desktopFileTree).length === 0) {
      initialIcons = [
        { id: '0', name: 'Hard Drive', type: 'dir', src: hardDrive },
        { id: '1', name: 'Generic Folder', type: 'dir', src: genericFolder },
      ];
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

    console.log('Setting Icons:', initialIcons);
    console.log('Setting Positions:', initialPositions);
    setIcons(initialIcons);
    setPositions(initialPositions);
  }, [JSON.stringify(desktopFileTree)]); // Use stringified version to detect deep changes

  const { openWindows, openWindow } = useWindowManager();

  const handleDragStart = (id, e) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedId(id);
    console.log('Drag started:', id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDropTargetId(null);
    console.log('Drag ended');
  };

  const handleDragOver = (index, e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTargetId(index);
    console.log('Dragging over index:', index);
  };

  const handleDragEnter = (index, e) => {
    e.preventDefault();
    setDropTargetId(index);
    console.log('Drag entered index:', index);
  };

  const handleDragLeave = (index, e) => {
    e.preventDefault();
    setDropTargetId(null);
    console.log('Drag left index:', index);
  };

  const handleDrop = (targetIndex, e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    console.log(`Dropped ${draggedId} onto index ${targetIndex}`);

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

    console.log('Updated Positions after drop:', updatedPositions);
    setPositions(updatedPositions);
    setDraggedId(null);
    setDropTargetId(null);
  };

  const handleDoubleClick = (icon) => {
    if (icon.type === 'dir') {
      openWindow('finder');
    } else if (icon.type === 'file') {
      openWindow('textedit');
    }
  };

  const getIconAtPosition = (position) => {
    const iconId = Object.keys(positions).find(
      (id) => positions[id] === position
    );
    return iconId !== undefined ? icons.find((icon) => icon.id === iconId) : null;
  };

  return (
    <>
      <TopBar />
      <div
        className='desktop h-full relative'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='actual-icons-space h-[88%] w-full grid grid-cols-9 grid-rows-5 gap-x-4 gap-y-4 p-4'>
          {Array.from({ length: 45 }).map((_, index) => {
            const icon = getIconAtPosition(index);

            return (
              <div
                key={index}
                className={`icon-container flex flex-col items-center justify-center p-1 w-full h-full ${
                  dropTargetId === index ? 'bg-gray-200 rounded' : ''
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
                      className={`h-16 w-16 cursor-move ${draggedId === icon.id ? 'opacity-50' : 'opacity-100'}`}
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
                      className='text-xs mt-1 text-white text-shadow-2xs'
                      style={{
                        textShadow: '0 0 2px black, 0 0 4px black',
                      }}
                    >
                      {icon.name}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        {openWindows['terminal'] && <Terminal />}
        {openWindows['calculator'] && <Calculator />}
        {openWindows['contacts'] && <Contacts />}
        {openWindows['textedit'] && <TextEdit />}
        {openWindows['dictionary'] && <Dictionary />}
        {openWindows['safari'] && <Safari />}
        {openWindows['mail'] && <Mail />}
        {openWindows['dashboard'] && <Dashboard />}
        {openWindows['xcode'] && <Xcode />}
        {openWindows['aboutme'] && <AboutMe />}
        {openWindows['finder'] && <Finder />}
      </div>
      <Taskbar />
    </>
  );
};

export default Desktop;