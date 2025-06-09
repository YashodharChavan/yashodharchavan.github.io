import React, { useState, useRef } from 'react'
import SimpleFrame from './SimpleFrame'
import './component.css'
import emailEnvelop from '../assets/emailEnvelop.svg'
import paperPencil from '../assets/paperPencil.svg'
import notAllowed from '../assets/notAllowed.svg'
import paperShredder from '../assets/paperShredder.svg'
import inbox from '../assets/inbox.svg'
import paperPlane from '../assets/paperPlane.svg'



const MailInbox = () => {

    return (
        <div className="hello h-full w-full ">
            <div className="inbox-list h-fit w-full bg-white flex items-center">
                <div className="w-[25%] name">Yashodhar</div>
                <div className="w-[45%] subject">Thank you</div>
                <div className="w-[30%] date">I glad</div>
            </div>
        </div>
    )
}

const MailSent = () => {
    return (
        <div className="hello h-full w-full">
            mail sent
        </div>
    )
    
}





const Mail = () => {
    const [activePage, setActivePage] = useState('inbox');
    


    return (
        <SimpleFrame
            title="Mail"
            icon="mail"
            id="mail"
            width="700"
            height="500"
            minWidth="300"
            minHeight="300"
            hasPadding={false}
            showDimensions={false}
            isResizable={true}
        >

            <div className="top-mail-bar h-fit flex select-none items-center gap-x-2 justify-end border-b border-gray-400" style={{ padding: "4px 12px", backgroundImage: "linear-gradient(rgb(204, 204, 204), rgb(213 213 213))" }}>

                <div className="address-button disabled">
                    <button>
                        <img src={notAllowed} alt="" />
                    </button>
                    <p>delete</p>
                </div>

                <div className="address-button disabled">
                    <button>
                        <img src={paperShredder} alt="" />
                    </button>
                    <p>junk</p>
                </div>

                <div className="address-button"></div>
                <div className="address-button">
                    <button>
                        <img src={paperPencil} alt="" />
                    </button>
                    <p>New</p>
                </div>

                <div className="address-button">
                    <button >
                        <img src={emailEnvelop} alt="" />
                    </button>
                    <p>Get Mail</p>
                </div>

                <div className="address-button">

                <input type="text"  className="rounded-2xl bg-white glow-on-focus mail-input h-7 " style={{padding: "0px 8px"}}/>
                <p>Search</p>
                </div>

            </div>

            <div className="main-mail-content flex h-full w-full" style={{height: "calc(100% - 58px)"}}>
                <div className="hamburger w-36 h-full bg-[#dae0eb] flex flex-col gap-y-2 border-r border-gray-400">
                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{padding: "4px"}} onClick={() => setActivePage('inbox')}>
                        <img src={inbox} alt="" className='h-6' />
                        <p>Inbox</p>
                    </div>
                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{padding: "4px"}} onClick={()=> setActivePage('sent')}>
                        <img src={paperPlane} alt="" className='h-6'/>
                        <p>Sent</p>
                    </div>
                
                </div>


                <div className="main-screen w-[90%] h-full bg-red-400 overflow-y-scroll">
                    <div className="top-info-section flex h-fit bg-white items-center justify-between" 
                        style={{background: 'linear-gradient(to bottom, #F9F9F9, #CCCCCC)'}}
                    >
                        <div className='w-[25%] outline outline-gray-400' style={{padding: "0px 4px"}}>from</div>
                        <div className='w-[45%] outline outline-gray-400' style={{padding: "0px 4px"}}>subject</div>
                        <div className='w-[30%] outline outline-gray-400' style={{padding: "0px 4px"}}>date recieved</div>
                </div>

                    {activePage == 'inbox' ? (
                        <MailInbox/>
                    ): (
                        <MailSent/>
                    )};
                </div>
            </div>

        </SimpleFrame>
    )
}

export default Mail