import '../index.css'
import React from 'react'
import logo from '../assets/logo.svg' // Uncomment if you want to use the logo as a local image
import loading from '../assets/loading.gif' // Uncomment if you want to use the loading gif as a local image


const BootScreen = () => {
    return (
        <div className="w-full max-w-full aspect-[4/3] bg-[#BFBFBF] shadow-xl flex justify-center h-full items-center ">
            <div className="asset-collection h-60 w-32 flex items-center justify-between flex-col">
                <img loading='lazy' src={logo} alt="" className='h-24' />

                <img loading='lazy' src={loading} className="h-8" alt="" />
            </div>
        </div>


    )
}

export default React.memo(BootScreen);