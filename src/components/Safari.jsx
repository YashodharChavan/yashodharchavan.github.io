import React from 'react'
import SimpleFrame from './SimpleFrame'
import ReloadIcon from '../assets/ReloadIcon.svg'
const Safari = () => {
  return (
    <SimpleFrame
        id="safari"
        name="safari"
        title="Safari"
        icon="safari"   
        height="550"
        width="800"
        minHeight="300"
        minWidth="400"
        hasPadding={false}
        isResizable={true}

    >
        <div className="url-bar w-full flex items-center" style={{background: "linear-gradient(rgb(199 199 199) 0%, rgb(217, 217, 217) 100%)"}}>
            <button className='h-full w-8 bg-white flex items-center justify-center'>
                <img src={ReloadIcon} alt="" className="h-6" />
            </button>
        </div>


    </SimpleFrame>
  )
}

export default Safari