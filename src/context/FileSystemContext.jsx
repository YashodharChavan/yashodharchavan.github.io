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

  return (
    <FileSystemContext.Provider value={{ fileSystem, updateFileSystem, currentPath, updateCurrentPath }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);