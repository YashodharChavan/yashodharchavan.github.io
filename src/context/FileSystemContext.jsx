import React, { createContext, useContext, useState } from 'react';
import { fileSystem as initialFileSystem } from '../components/Utils/fileSystem';

const FileSystemContext = createContext();

export const FileSystemProvider = ({ children }) => {
  const [fileSystem, setFileSystem] = useState(initialFileSystem);
  const [currentPath, setCurrentPath] = useState(['/', 'Users', 'yashodhar']);
  const [pendingNewItem, setPendingNewItem] = useState(null);  // 👈 NEW
  const [contextMenu, setContextMenu] = useState({
    source: null,
    position: { left: null, top: null },
    path: null
  })

  const updateFileSystem = (updatedFS) => {
    setFileSystem({ ...updatedFS });
  };

  React.useEffect(() => {
    console.log(currentPath)
  }, [currentPath])

  const updateCurrentPath = (newPath) => {
    setCurrentPath(newPath);
  };

  const deleteNodeAtPath = (path) => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length < 1) return;

    const newFileSystem = { ...fileSystem };
    let current = newFileSystem['/'];

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current.children || !current.children[part]) return;
      current = current.children[part];
    }

    const lastPart = parts[parts.length - 1];
    const nodeToDelete = current.children?.[lastPart];

    if (!nodeToDelete) return;

    // ✅ Recursively delete children if it's a folder
    const recursivelyDelete = (node) => {
      if (node.type === 'dir' && node.children) {
        for (const childName in node.children) {
          recursivelyDelete(node.children[childName]);
        }
      }
    };

    recursivelyDelete(nodeToDelete);

    // ✅ Now delete the folder/file itself
    delete current.children[lastPart];

    // ✅ Update the state
    setFileSystem(newFileSystem);
  };

  function addItemAtPath(fileSystem, path, itemName, itemData = null) {
    if (!Array.isArray(path) || path.length === 0 || !itemName) {
      console.log(fileSystem, path, itemName, itemData)
      console.warn('Invalid arguments provided to addItemAtPath');
      return;
    }

    let current = fileSystem['/'];
    for (let i = 1; i < path.length; i++) {
      const folder = path[i];
      if (!current.children || !current.children[folder]) {
        console.warn(`Path not found: ${path.join('/')}`);
        return;
      }
      current = current.children[folder];
    }

    if (!current.children) current.children = {};
    current.children[itemName] = itemData;
  }




  return (
    <FileSystemContext.Provider value={{
      fileSystem,
      updateFileSystem,
      currentPath,
      updateCurrentPath,
      deleteNodeAtPath,
      pendingNewItem,
      setPendingNewItem,
      addItemAtPath,
      contextMenu,
      setContextMenu
    }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => React.useContext(FileSystemContext);
