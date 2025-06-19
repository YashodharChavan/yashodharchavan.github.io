import React, { createContext, useContext, useState } from 'react';
import { fileSystem as initialFileSystem } from '../components/Utils/fileSystem';

const FileSystemContext = createContext();

export const FileSystemProvider = ({ children }) => {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [currentPath, setCurrentPath] = useState(['/', 'Users', 'yashodhar']);

  const updateFileSystem = (updatedFS) => {
    setFileSystem({ ...updatedFS });
  };

  const updateCurrentPath = (newPath) => {
    setCurrentPath(newPath);
  };

  // Removes a node at a given path (e.g., '/Users/yashodhar/Desktop/sample.txt')
  const deleteNodeAtPath = (path) => {
    const parts = path.split('/').filter(Boolean); // removes leading/trailing slashes
    if (parts.length < 1) return;

    const newFileSystem = { ...fileSystem };
    let current = newFileSystem;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current.children || !current.children[part]) return; // path doesn't exist
      current = current.children[part];
    }

    const lastPart = parts[parts.length - 1];
    if (current.children && current.children[lastPart]) {
      delete current.children[lastPart];
      setFileSystem(newFileSystem); // trigger state update
    }
  };


  return (
    <FileSystemContext.Provider value={{ fileSystem, updateFileSystem, currentPath, updateCurrentPath, deleteNodeAtPath }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);