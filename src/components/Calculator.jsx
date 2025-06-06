import React from 'react'
import SimpleFrame from './SimpleFrame'

const Calculator = () => {
  return (
    <>
        <SimpleFrame title="Calculator" id="calculator" icon="calculator" height="340" width="300" minHeight="340" minWidth="300">
            <div className="calculator-container">
                <div className="calculator-display">0</div>
                <div className="calculator-buttons">
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>/</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>*</button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>-</button>
                    <button>0</button>
                    <button>.</button>
                    <button>=</button>
                    <button>+</button>
                </div>
            </div>

        </SimpleFrame>
    
    </>
  )
}

export default Calculator