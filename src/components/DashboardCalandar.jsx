import React, { useState, useRef, useEffect } from 'react';
import './component.css';
// import AnalogClock from 'analog-clock-react';
import "react-clock/dist/Clock.css";


const RemainingDashboardCalender = () => {

    const generateCalendarDays = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of week for the 1st (0 = Sunday, 6 = Saturday)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month

        const days = [];

        // Add blanks before the 1st day
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(' ');
        }

        // Add actual days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(String(day));
        }

        // Add blanks after the last day to complete the grid (multiple of 7)
        while (days.length % 7 !== 0) {
            days.push(' ');
        }

        return days;
    };


    const [calenderDays, setCalenderDays] = useState(generateCalendarDays(new Date().getFullYear(), new Date().getMonth()));
    const [dayNames, setDayNames] = useState(['S', 'M', 'T', 'W', 'T', 'F', 'S'])

    return (

        <div className="remaining-dashboard-calender grid grid-cols-7 grid-rows-6 bg-[#B80A0A] shadow-[0px_0px_20px_black] h-36 w-48 rounded-br-lg rounded-bl-lg"
            style={{ padding: "4px 12px" }}
            onClick={(e) => { e.stopPropagation() }}
        >

            {dayNames.map((day, index) => {
                return (
                    <>
                        <div key={index} className="day flex items-center justify-end font-semibold text-[#EE9556]">{day}</div>
                        {/* <hr /> */}
                    </>
                )
            })}

            {calenderDays.map((day, index) => (
                <>
                    <div key={index} className="day flex items-center justify-end font-semibold text-white">{day}</div>
                    {/* <hr /> */}
                </>
            ))}
        </div>
    )
}



const DashboardCalendar = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef({ x: 100, y: 100 });
    const [dateNumber, setDateNumber] = useState();
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [toDisplayFullCalender, setToDisplayFullCalender] = useState(false);
    const [hasDragged, setHasDragged] = useState(false); // Track if dragging occurred
    const dragStartPosRef = useRef({ x: 0, y: 0 }); // Track starting position for drag detection
    const calenderRef = useRef(null)
    const areaRef = useRef(null)


    const handleCalenderClick = (e) => {
        if (hasDragged) {
            // If a drag occurred, prevent the click from toggling the calendar
            setHasDragged(false); // Reset drag state
            return;
        }
        setToDisplayFullCalender((prev) => !prev);

        setTimeout(() => {
            if (calenderRef.current) {
                if (!toDisplayFullCalender) {
                    // When showing the full calendar, set bottom and top radii to 0
                    calenderRef.current.style.borderBottomLeftRadius = '0px';
                    calenderRef.current.style.borderBottomRightRadius = '0px';
                } else {
                    // When hiding, reset all radii to match rounded-lg (8px in Tailwind)
                    calenderRef.current.style.borderBottomLeftRadius = '8px';
                    calenderRef.current.style.borderBottomRightRadius = '8px';
                }
            }
        }, 0);
    };


    useEffect(() => {
        const date = new Date();

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        setDay(days[date.getDay()].slice(0, 3));

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        setMonth(months[date.getMonth()].slice(0, 3));

        setDateNumber(date.getDate());
    }, [])



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
        setHasDragged(true);
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
            ref={calenderRef}
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}>



            <div className="today-date-top-header flex flex-col items-center w-full h-full"
                ref={areaRef}
                onClick={(e) => handleCalenderClick(e)}
            >

                <div className="flex items-center justify-between gap-x-1 w-full h-full" ref={calenderRef}>
                    <div className="first bg-[#F7F7F7] h-full w-[46%] rounded-lg" style={{ padding: '4px 8px' }}>
                        <div className="shadow-[0px_0px_2px_#383838] sticky-header w-9 h-2 bg-black rounded-3xl"
                            style={{
                                background: 'linear-gradient(to bottom, #C76767 0%, #C76767 50%, #A50B0B 50%, #A50B0B 100%)',
                                margin: '0 auto',
                            }}
                        ></div>
                        <p className='text-2xl relative top-1.5 text-[#F10505] font-semibold' style={{ fontFamily: 'SF Pro Display' }}>{day}</p>
                        <p className='text-4xl text-[#F10505] font-semibold' style={{ fontFamily: 'SF Pro Display' }}>{month}</p>
                    </div>




                    <div className="second bg-[#F7F7F7] h-full w-[54%] flex flex-col justify-between items-center rounded-lg" style={{ padding: '4px 8px' }}>

                        <div className="shadow-[0px_0px_2px_#383838] sticky-header w-9 h-2 bg-black rounded-3xl"
                            style={{
                                background: 'linear-gradient(to bottom, #C76767 0%, #C76767 50%, #A50B0B 50%, #A50B0B 100%)',
                                margin: '0 auto',
                            }}
                        ></div>
                        <p className='text-6xl text-[#F10505] font-semibold' style={{ fontFamily: 'SF Pro Display' }}>{dateNumber}</p>
                    </div>
                </div>


                {toDisplayFullCalender && <RemainingDashboardCalender />}
            </div>



        </div>
    );
};

export default DashboardCalendar;