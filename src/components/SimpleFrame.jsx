// SimpleFrame.jsx
import React from 'react';
import './component.css'
import cornerStone from '../assets/cornerStone.svg'

const SimpleFrame = ({ title, children, hasDrawer }) => {
  return (
    <div className="simple-frame z-10 bottom-2/3 bg-white rounded-md relative left-48 h-80 w-1/2">
        <div className="top-bar flex items-center justify-between p-2 text-[#3A3A3A] rounded-t-md" style={{    background: 'linear-gradient(to bottom, #F9F9F9, #CCCCCC)',
    padding: '0px 12px'}}>
            <div className="closing-buttons flex gap-x-2 items-center">
                <div className="mac-dot red"></div>
                <div className="mac-dot yellow"></div>
                <div className="mac-dot green"></div>
            </div>
            <span className="title select-none">{title}</span>
            {hasDrawer && (
            <button className="drawer-toggle bg-gray-600 p-1 rounded">≡</button>
            )}
            {
            !hasDrawer && (
                <div className='w-16'></div>
            )}

        </div>
        <div className="content h-[93%]" style={{ overflowY: 'auto', padding: '4px' }}>
            {children}
        </div>

        <div className="corner h-4 w-4 bg-gray absolute right-0 bottom-0">
            <img src={cornerStone} className="h-full " />
        </div>
    </div>
  );
};

export default SimpleFrame;