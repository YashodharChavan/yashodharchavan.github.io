import React, { useState, useRef, useEffect } from 'react';
import './component.css';
// import AnalogClock from 'analog-clock-react';
import "react-clock/dist/Clock.css";




const DashboardCalendar = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 100, y: 100 });




    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - dragStartRef.current.x;
            const newY = e.clientY - dragStartRef.current.y;
            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            className="flex flex-col gap-y-1.5 items-center h-24 w-48 bg-[#B80A0A] rounded-lg select-none shadow-[0px_0px_20px_black]"
            style={{
                position: 'absolute',
                left: "61%",
                top: "33%",
                transform: `translate(${position.x}px, ${position.y}px)`,
                fontFamily: 'sans-serif',
                padding: '4px 12px'
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}>
                <div className="today-date-top-header flex gap-x-1 justify-between items-center w-full h-full">

                    <div className="first bg-[#F7F7F7] h-full w-[46%] rounded-lg" style={{padding: '4px 8px'}}>
                        <div className="shadow-[0px_0px_2px_#383838] sticky-header w-9 h-2 bg-black rounded-3xl" 
                            style={{background: 'linear-gradient(to bottom, #C76767 0%, #C76767 50%, #A50B0B 50%, #A50B0B 100%)',
                                margin: '0 auto',
                            }}
                        ></div>
                        <p className='text-2xl relative top-1' style={{fontFamily: 'SF Pro Display'}}>Tue</p>
                        <p className='text-3xl'  style={{fontFamily: 'SF Pro Display'}}>JAN</p>
                    </div>




                    <div className="second bg-[#F7F7F7] h-full w-[54%] rounded-lg"  style={{padding: '4px 8px'}}>

                        <div className="shadow-[0px_0px_2px_#383838] sticky-header w-9 h-2 bg-black rounded-3xl"
                            style={{background: 'linear-gradient(to bottom, #C76767 0%, #C76767 50%, #A50B0B 50%, #A50B0B 100%)',
                                margin: '0 auto',
                            }}
                        ></div>
                        <p>10</p>
                    </div>
                </div>


        </div>
    );
};

export default DashboardCalendar;