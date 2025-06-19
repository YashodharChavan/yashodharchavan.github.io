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

  const deleteNodeAtPath = (path) => {
    console.log('Path received:', path);
    const parts = path.split('/').filter(Boolean);
    console.log('Parts:', parts);

    if (parts.length < 1) return

  const newFileSystem = { ...fileSystem };
  let current = newFileSystem['/'];

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current.children || !current.children[part]) {
      console.warn('Invalid path segment:', part, 'aborting');
      return;
    }
    current = current.children[part];
  }

  const lastPart = parts[parts.length - 1];
  if (current.children && current.children[lastPart]) {
    console.log('Deleting:', lastPart);
    delete current.children[lastPart];
    setFileSystem(newFileSystem);
    console.log('FileSystem updated');  // <-- this should now print
  } else {
    console.warn('Nothing found to delete at:', lastPart);
  }
};



return (
  <FileSystemContext.Provider value={{ fileSystem, updateFileSystem, currentPath, updateCurrentPath, deleteNodeAtPath }}>
    {children}
  </FileSystemContext.Provider>
);
};

export const useFileSystem = () => useContext(FileSystemContext);