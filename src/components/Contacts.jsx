import React, {useState, useRef, useEffect} from 'react'
import './component.css'
import { useWindowManager } from '../context/WindowManagerContext';
import SimpleFrame from './SimpleFrame'
import texture from '../assets/texture.jpg'
import appleLogo from "../../public/appleLogo.svg"
import userLogo from "../../public/userLogo.svg"
import Yashodhar from './Yashodhar'
import Apple from './Apple'
import search from "../assets/icons/search.svg"
const Contacts = () => {
    const [isFirstChatSelected, setIsFirstChatSelected] = useState(true)
    const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focuses input on component mount
  }, []);


    const selectFirstChat = ()=> {
        setIsFirstChatSelected(true);
    }
    const selectSecondChat = ()=> {
        setIsFirstChatSelected(false);
    }

  return (
    <SimpleFrame 
        optionalBackground={texture}
        isResizable={false}
        title="Address Book"
        id='contacts'
        icon='contacts'
        height="400"
        width="700"
        minHeight="400"
        minWidth="700"
        showDimensions={false}
        hasDrawer={false}
    > 

        <div className="search-title relative h-8 w-full flex items-center justify-end" style={{padding: "0px 12px"}} >
            <input type="text" ref={inputRef} placeholder='search' focused className='bg-white rounded-xl focus:outline-none' style={{padding: "0px 8px", boxShadow: "0px 0px 4px 4px #87AED0"}}/> 
        </div>  

        <div className="address-section flex h-[90%] w-full justify-between items-center" style={{padding: "0px 12px", marginTop: "4px"}}>
            <div className="address-name w-[30%] h-full flex flex-col items-center gap-y-2 bg-white">
                <p className="w-full bg-gray-200 flex justify-center">Name</p>

                <div className="w-full flex gap-x-1 items-center cursor-pointer hover:bg-gray-100" style={{padding: "0px 12px"}} onClick={selectFirstChat}>
                    <img src={userLogo} alt="" className='h-5'/>
                    <p>Yashodhar Chavan</p>
                </div>

                <div className="w-full flex gap-x-1 items-center cursor-pointer hover:bg-gray-100" style={{padding: "0px 12px"}}onClick={selectSecondChat}>
                    <img src={appleLogo} alt="" className='h-5'/>
                    <p>Apple</p>
                </div>
            </div>
            <div className="bg-transparent h-full w-[1%] flex text-white justify-center items-center font-bold">
                .
            </div>
            <div className="address-value w-[69%] h-full bg-white" style={{padding: "8px 12px"}}>
                {isFirstChatSelected?  (
                    < Yashodhar/>
                ): (
                    <Apple/>
                )}
            </div>
        </div>
    </SimpleFrame>
  )
}

export default Contacts