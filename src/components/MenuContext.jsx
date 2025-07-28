import React from "react";



const MenuContext = ({ position, source }) => {

  if (position.left === null || position.right === null) return null;

  return (
    <div className='flex flex-col bg-white shadow-2xs absolute z-50' style={{ left: source==='finder'? position.left/2: position.left , top: source==='finder' ? position.top/2: position.top, boxShadow: "-1px 1px 6px 0px #767676" }}>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>New Folder</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>New Burn Folder</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>New File</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Get Info</p>
      <hr />
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Show View Options</p>
      <hr />
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Automator</p>
      <p className='hover:bg-[#2A68C8] hover:text-white cursor-pointer bg-white' style={{ padding: '0px 16px' }}>Enable Folder Actions</p>
    </div>
  )
}

export default MenuContext