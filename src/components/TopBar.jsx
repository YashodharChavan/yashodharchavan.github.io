import '../index.css'
import './component.css'
import React from 'react'
import { useEffect } from 'react'
import topIcon from '../assets/topIcon.svg' // Uncomment if you want to use the top icon as a local image
import spotlight from '../assets/spotlight.svg' // Uncomment if you want to use the spotlight icon as a local image
import battery from '../assets/battery.png' // Uncomment if you want to use the battery icon as a local image

const TopBar = () => {

  const [date, setDate] = React.useState("");
  
   useEffect(() => {
    const now = new Date();
    const options = {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    const formatted = now.toLocaleString('en-US', options);
    setDate(formatted);
  }, []); // Runs only once after first render

  return (
    <div className='w-full h-6 flex items-center select-none justify-between padding-top shadow-md rounded-tl-md rounded-tr-md' style={{
      background: 'linear-gradient(to bottom, #FDFDFD 0%, #FDFDFD 25%, #F2F2F2 25%, #F2F2F2 75%, #FDFDFD 75%, #FDFDFD 100%)'
    }}>

      <div className="left-content flex items-center gap-x-5">
        <img src={topIcon} alt="" className='h-5' />
        <p className='font-semibold'>Name of software</p>
        <p className='font-medium'>File</p>
        <p className='font-medium'>Edit</p>
        <p className='font-medium'>View</p>
        <p className='font-medium'>Go</p>
        <p className='font-medium'>Window</p>
        <p className='font-medium'>Help</p>
      </div>
      <div className="right-content flex items-center gap-x-5">
        <img src={battery} alt="" className='h-5' />
        <p>{date}</p>
        <img src={spotlight} alt="" className='h-5' />
      </div>
    </div>
  )
}

export default TopBar