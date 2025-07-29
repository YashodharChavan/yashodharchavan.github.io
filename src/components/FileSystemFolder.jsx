import React, { useEffect, useState, useRef } from 'react';
import { rootFileOptions, applicationIcons } from './Utils/fileSystem';
import { useWindowManager } from '../context/WindowManagerContext';
import { useFileSystem } from '../context/FileSystemContext';

const FileSystemFolder = ({ node, path, setFileSystemPath }) => {

  if (!node || node.type !== 'dir') return null;

  const { openWindow } = useWindowManager();
  const { pendingNewItem, setPendingNewItem, updateFileSystem, addItemAtPath, fileSystem } = useFileSystem(); // assumes you have update logic in context
  const [newItemName, setNewItemName] = useState('');
  const inputRef = useRef(null);

  const isPathApplication = path === '/Applications';
  const children = Object.entries(node.children);

  useEffect(() => {
    if (pendingNewItem && pendingNewItem.path === path) {
      setNewItemName('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [pendingNewItem, path]);

  const handleNameSubmit = () => {
    const name = newItemName.trim();
    if (!name) {
      setPendingNewItem(null);
      return;
    }

    if (!pendingNewItem || !pendingNewItem.path) return;

    if (node?.children?.[name]) {
      alert("Item with this name already exists!");
      return;
    }

    const type = pendingNewItem.type === 'folder' ? 'dir'
      : pendingNewItem.type === 'file' ? 'file'
        : pendingNewItem.type === 'burn' ? 'burn'
          : 'file';

    const pathArray = ['/', ...pendingNewItem.path.split('/').filter(Boolean)];

    addItemAtPath(
      fileSystem,
      pathArray,
      name,
      {
        type,
        ...(type === 'dir' || type === 'burn' ? { children: {} } : { content: '' }),
        icon: getIconForItem(name, type)
      }
    );
    setPendingNewItem(null);
  };


  const getIconForItem = (name, type) => {
    if (type === 'burn') {
      return rootFileOptions.find(opt => opt.label === 'burn')?.icon;
    }

    if (type === 'dir') {
      const option = rootFileOptions.find((opt) => opt.label === name);
      return option ? option.icon : rootFileOptions.find(opt => opt.label === 'home')?.icon;
    }
    const ext = name.includes('.') ? `.${name.split('.').pop()}` : '';
    const iconMap = {
      '.md': '.md', '.pdf': '.pdf', '.bin': '.bin',
      '.zip': '.zip', '.html': '.html', '.ico': '.ico', '.css': '.css', '.js': '.js',
    };
    if (iconMap[ext]) {
      return rootFileOptions.find(opt => opt.label === iconMap[ext])?.icon;
    }
    if (ext === '.app') {
      return applicationIcons.find(opt => opt.label === name)?.icon;
    }
    return rootFileOptions.find(opt => opt.label === type || opt.label === '.txt')?.icon;
  };

  return (
    <div className={`grid ${isPathApplication ? 'grid-cols-4' : 'grid-cols-5'} gap-4 p-4`}>
      {children.map(([name, child]) => {
        const icon = getIconForItem(name, child.type);
        return (
          <div
            key={name}
            className="flex flex-col items-center justify-center p-2 hover:bg-[#A2B2CA] rounded cursor-pointer select-none"
            onDoubleClick={() => {
              if (child.type === 'dir') {
                const newPath = path === '/' ? `/${name}` : `${path}/${name}`;
                setFileSystemPath(newPath);
              } else if (child.type === 'file') {
                child.href
                  ? openWindow('safari', '', '', '', icon.name, child.href)
                  : openWindow('textedit', '', '', child.content, name);
              } else if (child.type === 'app') {
                openWindow(icon.split('/').pop().split('.')[0].toLowerCase());
              }
            }}
          >
            <img
              src={icon}
              draggable={false}
              alt={name}
              className="w-12 h-12"
            />
            <span className="text-sm text-center mt-1">{name}</span>
          </div>
        );
      })}

      {pendingNewItem && pendingNewItem.path === path && (
        <div className="flex flex-col items-center justify-center p-2">
          <img
            src={
              rootFileOptions.find(opt => opt.label === pendingNewItem.type)?.icon
              ?? (pendingNewItem.type === 'folder'
                ? rootFileOptions.find(opt => opt.label === 'home')?.icon
                : rootFileOptions.find(opt => opt.label === '.txt')?.icon)
            }
            alt="New"
            className="w-12 h-12"
          />
          <input
            ref={inputRef}
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleNameSubmit();
              if (e.key === 'Escape') setPendingNewItem(null);
            }}
            className="text-sm text-center mt-1 border rounded px-1"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default FileSystemFolder;
