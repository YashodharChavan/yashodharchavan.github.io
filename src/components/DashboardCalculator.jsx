import React, { useState, useRef, useEffect } from 'react';
import './component.css';
// import AnalogClock from 'analog-clock-react';
import "react-clock/dist/Clock.css";




const DashboardCalculator = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const clockRef = useRef(null);
    const dragStartRef = useRef({ x: 100, y: 100 });

    const [expression, setExpression] = useState('');
    const [operand, setOperand] = useState('')
    const [operator, setOperator] = useState('')


    const operands = [
        '7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'c'
    ]

    const operators = [
        '÷', 'x', '-', '+'
    ]

    const handleButtonClick = (value) => {

        console.log("clicked" + value)
        if (value === 'c') {
            setExpression('');
            setOperand('');
            setOperator('');
        } else if (value === '-' || value === '+' || value === 'x' || value === '÷') {
            setExpression(prev => prev + value);
            setOperator(value)
            setOperand('')

        } else if (value === '=') {

            try {
                const evalResult = eval(expression.replace(/÷/g, '/').replace(/x/g, '*'));
                setOperator('')
                setOperand(evalResult)
            } catch (e) {
                setResult('operand');
            }
        } else {
            setExpression(prev => prev + value);
            setOperand(prev => prev + value);
        }
    };

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
            className="flex flex-col gap-y-1.5 items-center h-64 w-44 bg-[#FC952D] gradient-box rounded-lg select-none shadow-[0px_0px_20px_black]"
            style={{
                zIndex: isDragging? 100: 1,
                position: 'absolute',
                left: "20%",
                top: "33%",
                transform: `translate(${position.x}px, ${position.y}px)`,
                fontFamily: 'sans-serif',
                padding: '8px'
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => e.stopPropagation()}>

            <div className="screen w-full h-11 bg-[#89949B] rounded-lg text-end text-2xl"
                style={{ boxShadow: 'inset 0px 0px 3px 0px #141414', fontFamily: "Digital-7", padding: "4px 12px" }}>{ operand.toString().slice(0, 12) || 0}</div>

            <div className="buttons w-full flex h-4/5 rounded-lg bg-[#BEBEBE]" style={{ padding: "2px" }}>


                <div className="left-buttons w-[78%] h-full">
                    <div className="first-row grid grid-cols-4 gap-x-1.5 h-7 text-xs" style={{ padding: '0px 2px' }}>
                        <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>m+</button>
                        <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>m-</button>
                        <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>mc</button>
                        <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>mr</button>
                    </div>

                    <div className="remaining-buttons grid grid-cols-3 grid-rows-4 h-[84%] gap-2" style={{ padding: "5px 3px 1px 2px" }}>


                        {operands.map((ope, index) => (
                            <button key={index} className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]' onClick={() => handleButtonClick(ope)}>{ope}</button>
                        ))}



                    </div>

                </div>


                <div className="right-buttons w-[22%] h-full grid grid-rows-6 text-xs gap-1" style={{ padding: "0px 4px" }}>
                    {/* <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>÷</button>
                    <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>x</button>
                    <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>-</button>
                    <button className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]'>+</button> */}

                    {operators.map((oper, index) => (
                        <button key={index} className='dashboard-calculator-buttons rounded-[50%] bg-[#E9E9E9]' onClick={() => handleButtonClick(oper)}
                        style={{backgroundColor: operator === oper ? "#FC952D"  : '#E9E9E9'}}
                        >{oper}</button>
                    ))}
                    <button className='dashboard-calculator-buttons rounded-full bg-[#E9E9E9] row-span-2' onClick={() => handleButtonClick('=')}>=</button>

                </div>



            </div>



        </div>
    );
};

export default DashboardCalculator;