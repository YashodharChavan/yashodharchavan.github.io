import React, { useState, useRef, useEffect } from 'react';
import './component.css';
// import AnalogClock from 'analog-clock-react';
import Clock from "react-clock";
import "react-clock/dist/Clock.css";




const DashboardClock = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const clockRef = useRef(null);
    const dragStartRef = useRef({ x: 100, y: 100 });
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

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
            ref={clockRef}
            className="bg-gradient-to-b split-background flex flex-col justify-center items-center h-36 w-36  rounded-lg select-none shadow-[0px_0px_20px_black]"
            style={{
                position: 'absolute',
                left: "42%",
                top: "40%",
                transform: `translate(${position.x}px, ${position.y}px)`,
                fontFamily: 'Monaco, "Courier New", monospace',
                boxShadow: 'inset 0px 0px 0px 2px #050505'
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}
        >
            <p className='absolute top-0 text-xs' style={{ textShadow: '0px 1px 5px white' }}>AM</p>
            <div className="clock rounded-full w-4/5 h-4/5 bg-white">
                <Clock
                    size={117}
                    value={date}
                    hourHandWidth={2}
                    minuteHandWidth={1}
                    secondHandWidth={1}
                    renderHourMarks={true}
                    renderMinuteMarks={false}
                    renderNumbers={true}
                    hourMarksLength={0}
                    minuteMarksLength={0}
                    numberStyle={{
                        fontSize: '6px',
                        fontWeight: 'bold',
                        fill: '#333',
                        fontFamily: 'Arial'
                    }}
                    
                    numbersRadius={85}
                    className="absolute inset-0 h-full w-full"
                />
            </div>

        </div>
    );
};

export default DashboardClock;