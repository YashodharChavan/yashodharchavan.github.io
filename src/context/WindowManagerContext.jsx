import React, { createContext, useContext, useState } from 'react';
import Terminal from '../components/Terminal';

const WindowManagerContext = createContext();

export const WindowManagerProvider = ({ children }) => {
  const [windows, setWindows] = useState([]);  // Registered windows
  const [openWindows, setOpenWindows] = useState({Terminal: false});  // id -> open status

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
    setOpenWindows(prev => ({ ...prev, [id]: true }));
  };

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
      registerWindow
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => useContext(WindowManagerContext);
