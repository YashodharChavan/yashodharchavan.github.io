import React from 'react'
import '../index.css'

import background from '../assets/background.png' // Uncomment if you want to use the background image as a local image
import TopBar from './TopBar'
import Taskbar from './Taskbar'
const Desktop = () => {
  return (
    <>
        <TopBar />
        <div className='desktop h-full relative' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          Desktop
        </div>
        <Taskbar />
    </>
  )
}

export default Desktop