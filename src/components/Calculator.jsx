import React, { useState } from 'react';
import SimpleFrame from './SimpleFrame';
import texture from '../assets/texture.jpg';
import './component.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [operand, setOperand] = useState('')
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('')


  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
      setOperand('');
      setOperator('');
      setResult('');
    } else if (value === '-' || value === '+' || value === 'x' || value === '÷') {
      setExpression(prev => prev + value);
      setOperator(value)
      setOperand('')
    } else if (value === '=') {

      try {
        const evalResult = eval(expression.replace(/÷/g, '/').replace(/x/g, '*'));
        setResult(evalResult);
      } catch (e) {
        setResult('Error');
      }
    } else {
      setExpression(prev => prev + value);
      setOperand(prev => prev + value);
    }
  };

  const buttons = [
    'MC', 'M+', 'M-', 'MR',
    'C', '±', '÷', 'x',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.', // double '0' for col-span
  ];

  return (
    <SimpleFrame
      title="Calculator"
      id="calculator"
      icon="calculator"
      height={320}
      width={260}
      minHeight={320}
      minWidth={260}
      showDimensions={false}
      hasDrawer={false}
      optionalBackground={texture}
      isResizable={false}
    >
      <div className="calculator-container h-full grid grid-rows-[repeat(7, 34px)] grid-cols-4 gap-1 p-2">
        <div
          className="col-span-4 flex flex-col justify-around text-right text-black bg-[#F1FACA] rounded"
          style={{ padding: "0px 8px" }}
        >
          <p>{result || operand ||'0'}</p>
          <p style={{ padding: "0px 64px"}}>{operator || ''} &nbsp;</p>
        </div>
        {buttons.map((btn, i) => {
          if (btn === '0' && i === buttons.lastIndexOf('0')) {
            // col-span 2 for the first '0'
            return (
              <button
                key={i}
                className="calc-buttons rounded col-span-2 border"
                onClick={() => handleButtonClick(btn)}
              >
                {btn}
              </button>
            );
          }
          if(btn === '=' && i === buttons.lastIndexOf('=')) {
            return (
              <button key={i} className="calc-buttons rounded border row-span-2 font-bold" onClick={() => handleButtonClick(btn) }>{btn}</button>
            )
          }

          if(btn === '.' && i === buttons.lastIndexOf('.')) {
            return (
              <button key={i} className="calc-buttons rounded border font-bold" onClick={() => handleButtonClick(btn)}>{btn}</button>
            )
          }
          return (
            <button
              key={i}
              className="calc-buttons rounded border"
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </SimpleFrame>
  );
};

export default Calculator;
