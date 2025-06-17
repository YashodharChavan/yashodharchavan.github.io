import React, { useState, useEffect, useRef } from 'react'
import { useWindowManager } from '../context/WindowManagerContext';
import DashboardClock from './DashboardClock';
import DashboardCalculator from './DashboardCalculator';
import DashboardCalendar from './DashboardCalandar';


const Dashboard = () => {
    const { registerWindow, minimizeWindow, restoreWindow, windows, closeWindow } = useWindowManager();
    const dashboardRef = useRef(null)

    useEffect(() => {
        registerWindow('dashboard', 'none', 'dashboard');
    }, []);

    const handleDashboardClose = (e) => {
        if(e.target == dashboardRef.current) {

            closeWindow('dashboard');
        }
    }


    return (

        <div ref={dashboardRef} className='absolute top-[-24px] z-[1000] left-0 h-screen w-auto aspect-[4/3] min-w-full bg-[#00000057]' onClick={(e)=> handleDashboardClose(e)}>
            <DashboardClock />
            <DashboardCalculator />
            <DashboardCalendar />
        </div>
    )
}

export default Dashboard