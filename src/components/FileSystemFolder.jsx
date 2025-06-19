import React from 'react';
import { rootFileOptions } from './Utils/fileSystem';
import { useWindowManager } from '../context/WindowManagerContext';

const FileSystemFolder = ({ node, path, setFileSystemPath }) => {
  if (!node || node.type !== 'dir') return null;


  const { openWindows, openWindow } = useWindowManager();
  const children = Object.entries(node.children);

  // Find the appropriate icon for a file or folder
  const getIconForItem = (name, type) => {
    if (type === 'dir') {
      // For directories, match by folder name
      const option = rootFileOptions.find((opt) => opt.label === name);
      return option ? option.icon : rootFileOptions.find(opt => opt.label === 'home')?.icon;
    } else {
      // For files, match by extension
      const extension = name.includes('.') ? `.${name.split('.').pop()}` : '';
      if (extension === '.md') {
        // Use the .md icon for markdown files
        const mdOption = rootFileOptions.find(opt => opt.label === '.md');
        return mdOption ? mdOption.icon : null;
      } else {
        // Use the .txt icon for all other files (including .txt)
        const txtOption = rootFileOptions.find(opt => opt.label === '.txt');
        return txtOption ? txtOption.icon : null;
      }
    }
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
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
              }
              else if (child.type === 'file') {
                openWindow('textedit', "", "", child.content, name);
              }
            }}
          >
            <img
              src={icon}
              draggable
              alt={name}
              className="w-12 h-12"
              onDragStart={(e) => {
                const fullPath = path === '/' ? `/${name}` : `${path}/${name}`;
                e.dataTransfer.setData('fullPath', fullPath);
              }}
            />

            <span className="text-sm text-center mt-1">{name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FileSystemFolder;