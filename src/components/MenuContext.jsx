import React from "react";
import { useFileSystem } from '../context/FileSystemContext';
import burn from '../assets/folders/burnableFolder.avif'


const MenuContext = ({ position, source, currentPath, onAddItem = null }) => {

  const { setPendingNewItem } = useFileSystem();

  const handleCreate = (type) => {
    if(type==='burn') {
      setPendingNewItem({ type, path: currentPath, icon: burn }); 
    }
    else {
      setPendingNewItem({type, path: currentPath})
    }
  };

  if (position.left === null || position.right === null) return null;
  console.log(position, source)

  return (
    <div className='flex flex-col bg-white shadow-2xs absolute z-1000' style={{ left: source === 'finder' ? position.left / 1.5 : position.left, top: source === 'finder' ? position.top / 1.5 : position.top, boxShadow: "-1px 1px 6px 0px #767676" }}>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }} onClick={(e) => handleCreate('folder')}>New Folder</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }} onClick={(e) => handleCreate('burn')}>New Burn Folder</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }} onClick={(e) => handleCreate('file')}>New File</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Get Info</p>
      <hr />
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Show View Options</p>
      <hr />
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Automator</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Enable Folder Actions</p>
    </div>
  )
}

export default React.memo(MenuContext);