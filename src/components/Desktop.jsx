import React, { useState } from 'react';
import '../index.css';
import { useWindowManager } from '../context/WindowManagerContext';
import background from '../assets/background.png';
import TopBar from './TopBar';
import Taskbar from './Taskbar';
import hardDrive from '../assets/icons/folders/Hard Drive.ico';
import genericFolder from '../assets/icons/folders/GenericFolderIcon.ico';
import Terminal from "./Terminal"; 
import Calculator from './Calculator';
import Contacts from './Contacts'
import TextEdit from './TextEdit'; // Import TextEdit component
import Dictionary from './Dictionary';
import Safari from './Safari';
import Mail from './Mail';
import Dashboard from './Dashboard';
import Xcode from './Xcode';
import AboutMe from './AboutMe';

const Desktop = () => {

  // Initial icons with IDs and labels
  const [icons, setIcons] = useState([
    { id: 1, name: 'Hard Drive', src: hardDrive },
    { id: 2, name: 'Generic Folder', src: genericFolder },
  ]);

  // Store the dragged icon index
  const [draggedIndex, setDraggedIndex] = useState(null);
  const { openWindows, openWindow } = useWindowManager();
  // Handle drag start
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Swap positions on drop
  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedIcons = [...icons];
    const temp = updatedIcons[draggedIndex];
    updatedIcons[draggedIndex] = updatedIcons[index];
    updatedIcons[index] = temp;

    setIcons(updatedIcons);
    setDraggedIndex(null);
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
            const icon = icons[index];

            return (
              <div
                key={index}
                className='icon-container flex flex-col items-center justify-center'
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
              >
                {icon && (
                  <>
                    <img
                      src={icon.src}
                      alt={`${icon.name} Icon`}
                      className='h-16 w-16 cursor-move'
                      draggable
                      onDragStart={() => handleDragStart(index)}
                    />
                    <span className='text-xs mt-1 text-white text-shadow-2xs'  style={{
    textShadow: '0 0 2px black, 0 0 4px black'
  }}>
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
      </div>
      <Taskbar />
    </>
  );
};

export default Desktop;
