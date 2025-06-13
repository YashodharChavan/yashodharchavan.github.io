import React, { useState, useRef, useEffect } from 'react'
import SimpleFrame from './SimpleFrame'
import './component.css'



const AboutMe = () => {
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const isResizing = useRef(false);
    const startX = useRef(0);
    const startWidth = useRef(0);
    const COLLAPSE_THRESHOLD = 100;


    const startResizing = (e) => {
        isResizing.current = true;
        startX.current = e.clientX;
        startWidth.current = sidebarWidth;
        document.body.style.cursor = 'col-resize';
    };


    const stopResizing = () => {
        isResizing.current = false;
        document.body.style.cursor = 'default';
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;

        const deltaX = e.clientX - startX.current;
        const newWidth = startWidth.current + deltaX;

        // Collapse if under threshold
        if (newWidth < COLLAPSE_THRESHOLD) {
            setSidebarWidth(0);
        } else if (newWidth <= 300) {
            setSidebarWidth(newWidth);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, []);
    return (
        <SimpleFrame
            title="About Me"
            id="aboutme"
            icon="aboutme"
            width="800"
            height="500"
            minHeight="450"
            minWidth="700"
            isResizable={true}
            hasPadding={false}
            hasDrawer={false}
            showDimensions={false}
        >

            <div className="xcode flex w-full h-full">


                <div className="sidebar h-full overflow-hidden whitespace-nowrap text-ellipsis gap-y-1 flex flex-col overflow-y-scroll scrollbar-hide" style={{ width: sidebarWidth }}>

                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{ padding: "4px" }}>
                        <p>About Me</p>
                    </div>

                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{ padding: "4px" }}>
                        <p>Education</p>
                    </div>

                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{ padding: "4px" }}>
                        <p>Skills</p>
                    </div>

                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{ padding: "4px" }}>
                        <p>Projects</p>
                    </div>

                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{ padding: "4px" }}>
                        <p>Resume</p>
                    </div>

                </div>
                <div className="w-1.5 h-full bg-[#D8D8D8] cursor-col-resize flex justify-center items-center"
                    onMouseDown={startResizing}
                ></div>
                <div className="code-section bg-blue-400 w-full h-full overflow-y-hidden">

                </div>

            </div>
        </SimpleFrame>
    )
}

export default AboutMe