import React, { createContext, useContext, useState, memo } from 'react';

const WindowManagerContext = createContext();

export const WindowManagerProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);  // Registered windows
  const [openWindows, setOpenWindows] = useState({'finder': true });  // id -> open status
  const [focusedWindowId, setFocusedWindowId] = useState(null);
  const [optionalText, setOptionalText] = useState('');
  const [optionalTitle, setOptionalTitle] = useState('');
  const [optionalPath, setOptionalPath] = useState('');
  const [currentTopComponent, setCurrentTopComponent] = useState();
  const [optionalTextEditPath, setOptionalTextEditPath] = useState();
  const [zOrder, setZOrder] = useState([]);
  const [optionalUrl, setOptionalUrl] = useState('');


  // Register window only once
  const registerWindow = (id, title, icon) => {
    setWindows(prev => {
      const exists = prev.find(w => w.id === id);
      return exists ? prev : [...prev, { id, title, icon, minimized: false }];
    });
  };

  // Used for Dashboard.jsx
  const bringToFront = (id) => {
    setZOrder((prev) => [...prev.filter(w => w !== id), id]);
  };

  const getZIndex = (id) => {
    const index = zOrder.indexOf(id);
    if (index === -1) return 1; // Not registered yet

    const baseZ = 900; // Start from 900 for all windows
    return baseZ + index;
  };


  // Open window and register if needed
  const openWindow = (id, title, icon, parameterText, parameterTitle, parameterPath) => {
    id = id.split('-')[0]; // Handle cases like 'textedit-untitled'
    registerWindow(id, title, icon);
    bringToFront(id);  // <-- 🔥 Make sure it's always 

    if (id === 'textedit') {
      setOptionalText(parameterText);
      setOptionalTitle(parameterTitle);
      setOptionalTextEditPath(parameterPath);
    }

    if (id === 'finder') {
      setOptionalPath(parameterPath)
    }

    if (id === 'safari') {
      console.log(parameterTitle, parameterPath)
      setOptionalUrl(parameterPath);
    }

    setOpenWindows(prev => ({ ...prev, [id.toLowerCase()]: true }));
    console.log(`Opening window: ${id}`);

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
    id = id.split('-')[0];
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
      optionalPath,
      optionalTextEditPath,
      bringToFront,
      currentTopComponent,
      setCurrentTopComponent,
      getZIndex,
      optionalUrl,
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => useContext(WindowManagerContext);
