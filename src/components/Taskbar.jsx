import React from 'react';
import '../index.css';
import finder from "../assets/icons/applications/Finder.ico";
import dashboard from "../assets/icons/applications/Dashboard.ico";
import mail from "../assets/icons/applications/Mail.ico";
import safari from "../assets/icons/applications/Safari.ico";
import contacts from "../assets/icons/applications/Contacts.ico";
// import iPhotos from '../assets/icons/applications/iPhoto.ico';
import terminal from '../assets/icons/applications/Terminal.ico';
import trashBin from '../assets/icons/applications/TrashIcon.ico';
import calculator from '../assets/icons/applications/Calculator.ico';
import dictionary from '../assets/icons/applications/Dictionary.ico';
import textEdit from '../assets/icons/applications/TextEdit.ico';
import xCode from '../assets/icons/applications/XCode.ico';
import aboutme from '../assets/icons/applications/AboutMe.ico';
import fullTrashBin from '../assets/folders/FullTrashIcon.ico'

import { useWindowManager } from '../context/WindowManagerContext';
import { useFileSystem } from '../context/FileSystemContext';

const Taskbar = ({ setCurrentTopComponent, onTrashDrop }) => {
  const { windows, restoreWindow, openWindow } = useWindowManager();
  const [isTrashFull, setIsTrashFull] = React.useState(false);
  const {deleteNodeAtPath} = useFileSystem();


  const icons = [
    { id: "finder", src: finder, name: "Finder" },
    { id: "dashboard", src: dashboard, name: "Dashboard" },
    { id: "mail", src: mail, name: "Mail" },
    { id: "safari", src: safari, name: "Safari" },
    { id: "dictionary", src: dictionary, name: "Dictionary" },
    { id: "contacts", src: contacts, name: "Contacts" },
    { id: "aboutme", src: aboutme, name: "About Me" },
    { id: "xcode", src: xCode, name: "XCode" },
    { id: "textedit", src: textEdit, name: "TextEdit" },
    { id: "terminal", src: terminal, name: "Terminal" },
    { id: "calculator", src: calculator, name: "Calculator" },
    { id: "trash", src: isTrashFull ? fullTrashBin : trashBin, name: "Trash", isTrash: true }

  ];


  return (
    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 m-auto w-4xl h-20 justify-around flex items-center select-none shadow-md bg-[#7688B3] gap-x-2 px-4'>
      {icons.map(({ id, src, name }) => {
        const appWindow = windows.find(w => w.id === id);

        return (
          <div
            key={id}
            className="relative group flex flex-col items-center cursor-pointer"
            onClick={() => {
              if (!appWindow) {
                // Open a new window if not opened yet
                setCurrentTopComponent(name)
                openWindow(id, name, src);
              } else if (appWindow.minimized) {
                // Restore if minimized
                restoreWindow(appWindow.id);
              }
              // If already opened and not minimized, do nothing (or focus logic if you want)
            }}
            onDragOver={(e) => {
              if (id === "trash") e.preventDefault();  // Allow drop
            }}
            onDrop={(e) => {
              if (id === 'trash') {
                e.preventDefault();

                const fullPath = e.dataTransfer.getData('fullPath');
                const iconId = e.dataTransfer.getData('text/plain');

                if (fullPath) {
                  // File/folder dropped from Finder
                  deleteNodeAtPath(fullPath);
                  setIsTrashFull(true);
                } else if (iconId && onTrashDrop) {
                  // File/folder dropped from Desktop
                  onTrashDrop(iconId);
                  setIsTrashFull(true);
                }
              }
            }}

          >
            <img
              className="h-4/5 select-none"
              draggable={false}
              src={src}
              alt={`${name} Icon`}
              style={{ width: (isTrashFull && name === 'Trash') && "256px" }}
            />
            {/* Tooltip */}
            <span className="absolute bottom-[110%] left-1/2 transform -translate-x-1/2 mb-1 
              px-2 py-1 text-white font-medium text-xl opacity-0 group-hover:opacity-100 
              transition-opacity whitespace-nowrap z-20 pointer-events-none text-shadow-[3px_1px_2px_black]">
              {name}
            </span>
            {/* Dot indicator */}
            {(appWindow && name !== 'Trash') && (
              <div
                className={`w-2 h-2 rounded-full mt-1 ${appWindow.minimized ? 'bg-white opacity-70' : 'bg-white'
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Taskbar;
