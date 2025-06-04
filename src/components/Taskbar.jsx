import React from 'react'
import '../index.css'
import finder from "../assets/icons/applications/Finder.ico"
import dashboard from "../assets/icons/applications/Dashboard.ico"
import mail from "../assets/icons/applications/Mail.ico"
import safari from "../assets/icons/applications/Safari.ico"
import messages from "../assets/icons/applications/Messages.ico"
import contacts from "../assets/icons/applications/Contacts.ico"
import iTunes from '../assets/icons/applications/iTunes.ico'
import iPhotos from '../assets/icons/applications/iPhoto.ico'
import calendar from '../assets/icons/applications/Calendar.ico'
import terminal from '../assets/icons/applications/Terminal.ico'
import grapher from '../assets/icons/applications/Grapher.ico'
import trashBin from '../assets/icons/applications/TrashIcon.ico'
const Taskbar = () => {
  return (
    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 m-auto w-4xl h-20 justify-around   flex items-center select-none shadow-md bg-[#7688B3] gap-x-2'>
      <img className='h-4/5' src={finder} alt="Finder Icon" />
      <img className='h-4/5' src={dashboard} alt="Dashboard Icon" />
      <img className='h-4/5' src={mail} alt="Mail Icon" />
      <img className='h-4/5' src={safari} alt="Mail Icon" />
      <img className='h-4/5' src={messages} alt="Messages Icon" />
      <img className='h-4/5' src={contacts} alt="Contacts Icon" />
      <img className='h-4/5' src={iTunes} alt="iTunes Icon" />
      <img className='h-4/5' src={iPhotos} alt="iPhotos Icon" />
      <img className='h-4/5' src={calendar} alt="Calendar Icon" />
      <img className='h-4/5' src={terminal} alt="Terminal Icon" />
      <img className='h-4/5' src={grapher} alt="Grapher Icon" />
      <img className='h-4/5' src={trashBin} alt="Trash Bin Icon" />
    </div>
  )
}

export default Taskbar