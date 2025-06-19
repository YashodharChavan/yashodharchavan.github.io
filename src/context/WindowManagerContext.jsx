import React, { createContext, useContext, useState } from 'react';

const WindowManagerContext = createContext();

export const WindowManagerProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);  // Registered windows
  const [openWindows, setOpenWindows] = useState({});  // id -> open status
  const [focusedWindowId, setFocusedWindowId] = useState(null);
  const [optionalText, setOptionalText] = useState('');
  const [optionalTitle, setOptionalTitle] = useState('');
  const [optionalPath, setOptionalPath] = useState('');
  const [currentTopComponent, setCurrentTopComponent] = useState();
  


  // Register window only once
  const registerWindow = (id, title, icon) => {
    setWindows(prev => {
      const exists = prev.find(w => w.id === id);
      return exists ? prev : [...prev, { id, title, icon, minimized: false }];
    });
  };

  // Open window and register if needed
  const openWindow = (id, title, icon, parameterText, parameterTitle, parameterPath) => {
    registerWindow(id, title, icon);
    if(id==='textedit') {
      setOptionalText(parameterText);
      setOptionalTitle(parameterTitle);
    }

    if(id==='finder') {
      setOptionalPath(parameterPath)
    }

    setOpenWindows(prev => ({ ...prev, [id.toLowerCase()]: true }));
  };

  const toggleWindow = (name) => setOpenWindows(prev => ({ ...prev, [name.toLowerCase()]: !prev[name.toLowerCase()] }));

  const minimizeWindow = (id) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  const restoreWindow = (id) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: false } : w))
    );
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  return (
    <WindowManagerContext.Provider value={{
      windows,
      openWindows,
      openWindow,
      minimizeWindow,
      restoreWindow,
      closeWindow,
      registerWindow,
      focusedWindowId,
      setFocusedWindowId,
      optionalText, 
      optionalTitle,
      optionalPath
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => useContext(WindowManagerContext);
