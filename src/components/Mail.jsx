import React, {useState} from 'react'
import SimpleFrame from './SimpleFrame'
import './component.css'
import paperPlane from '../assets/paperPlane.svg'
import paperClip from '../assets/paperClip.svg'


const Mail = () => {

    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    

  return (
    <SimpleFrame
        title="Mail"
        icon="mail"
        id="mail"
        width="600"
        height="500"
        minWidth="300"
        minHeight="300"
        hasPadding={false}
        showDimensions={false}
        isResizable={true}
    >
        <div className="top-mail-bar h-fit flex select-none gap-x-2 items-center" style={{padding: "4px 12px", backgroundImage: "linear-gradient(rgb(204, 204, 204), rgb(213 213 213))"}}>
            <div className="address-button">
                <button>
                    <img src={paperPlane} alt="" />
                </button>
                <p>Send</p>
            </div>

            <div className="address-button">
                <button>
                    <img src={paperClip} alt="" />
                </button>
                <p>Attach</p>
            </div>

            <div className="address-button">
                <button className='italic font-serif text-white'>A</button>
                <p>Fonts</p>
            </div>
        </div>



        <div className="email-header-fields h-fit select-none w-full flex items-center justify-center bg-[#ECECEC]" style={{padding: "8px 0px"}}>
            <div className="email-details w-4/5 select-none bg-[#ECECEC] h-full flex items-center gap-x-2">
                <div className="flex flex-col gap-y-3 names">
                    <p>Your Email: </p>
                    <p>Subject: </p>
                </div>


                <div className="flex flex-col gap-y-3 fields w-4/5">
                    <input type="email" onChange={(e)=> setEmail(e.target.value)} placeholder='enter your email' className='mail-input glow-on-focus w-full bg-white'/>
                    <input type="text" onChange={(e)=> setSubject(e.target.value)} placeholder='enter subject' className='mail-input glow-on-focus w-full bg-white'/>
                </div>
            </div>
        </div>

        <div className="w-full h-[calc(100% - 135px)]" style={{
            height: "calc(100% - 135px)"}}>
            <textarea name="email-draft" id="email-draft" className='h-[98%] w-full resize-none outline-none' style={{padding: "4px"}}>


            </textarea>
        </div>


    </SimpleFrame>
  )
}

export default Mail