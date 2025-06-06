import React, { createContext, useContext, useState } from 'react';
import Terminal from '../components/Terminal';

const WindowManagerContext = createContext();

export const WindowManagerProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);  // Registered windows
  const [openWindows, setOpenWindows] = useState({terminal: false});  // id -> open status
  const [focusedWindowId, setFocusedWindowId] = useState(null);


  // Register window only once
  const registerWindow = (id, title, icon) => {
    setWindows(prev => {
      const exists = prev.find(w => w.id === id);
      return exists ? prev : [...prev, { id, title, icon, minimized: false }];
    });
  };

  // Open window and register if needed
  const openWindow = (id, title, icon) => {
    registerWindow(id, title, icon);
    setOpenWindows(prev => ({ ...prev, [id.toLowerCase()]: true }));
  };

  const toggleWindow = (name) => setOpenWindows(prev => ({ ...prev, [name.toLowerCase()]: !prev[name.toLowerCase()] }));

  const minimizeWindow = (id) => {
    console.log(id)
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, minimized: true } : w))
    );
    console.log(openWindows)
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
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => useContext(WindowManagerContext);
