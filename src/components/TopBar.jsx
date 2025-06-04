import '../index.css'
import './component.css'
import React from 'react'

import topIcon from '../assets/topIcon.svg' // Uncomment if you want to use the top icon as a local image
import bluetooth from '../assets/bluetooth.svg' // Uncomment if you want to use the bluetooth icon as a local image
import wifi from '../assets/wifi.svg' // Uncomment if you want to use the wifi icon as a local image
const TopBar = () => {
  return (
    <div className='w-full h-7 flex items-center select-none justify-between padding-top shadow-md' style={{
      background: 'linear-gradient(to bottom, #FDFDFD 0%, #FDFDFD 25%, #F2F2F2 25%, #F2F2F2 75%, #FDFDFD 75%, #FDFDFD 100%)'
    }}>

      <div className="left-content flex items-center gap-x-5">
        <img src={topIcon} alt="" className='h-7' />
        <p className='font-semibold'>Finder</p>
        <p className='font-medium'>File</p>
        <p className='font-medium'>Edit</p>
        <p className='font-medium'>View</p>
        <p className='font-medium'>Go</p>
        <p className='font-medium'>Window</p>
        <p className='font-medium'>Help</p>
      </div>
      <div className="right-content flex items-center justify-center">
        <img src={bluetooth} alt="" className='h-5' />
        <img src={wifi} className="h-5" alt="" />
      </div>
    </div>
  )
}

export default TopBar