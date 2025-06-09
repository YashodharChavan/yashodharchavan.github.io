import React, { useState, useRef } from 'react'
import SimpleFrame from './SimpleFrame'
import emailEnvelop from '../assets/emailEnvelop.svg'
import paperPencil from '../assets/paperPencil.svg'
import notAllowed from '../assets/notAllowed.svg'
import paperShredder from '../assets/paperShredder.svg'
import inbox from '../assets/inbox.svg'
import paperPlane from '../assets/paperPlane.svg'
import back from '../assets/back.svg'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './component.css'


const MailInbox = ({ isWindowOpen, setIsWindowOpen, searchQuery }) => {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${mm}/${yyyy}`;



    const handleOpenMailWindow = () => {
        setIsWindowOpen(true);
    }


    const highlightMatch = (text) => {
        if (!searchQuery) return text;

        const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
        if (index === -1) return text;

        return (
            <>
                {text.substring(0, index)}
                <span className="bg-yellow-300">{text.substring(index, index + searchQuery.length)}</span>
                {text.substring(index + searchQuery.length)}
            </>
        );
    };



    return (
        <div className="hello h-fit w-full ">
            {!isWindowOpen ? (
                <>
                    <div className="top-info-section flex h-fit select-none items-center justify-between"
                        style={{ background: 'linear-gradient(rgb(213, 213, 213), rgb(233 232 232))' }}>
                        <div className='w-[25%] outline outline-gray-400' style={{ padding: "0px 4px" }}>From</div>
                        <div className='w-[45%] outline outline-gray-400' style={{ padding: "0px 4px" }}>Subject</div>
                        <div className='w-[30%] outline outline-gray-400' style={{ padding: "0px 4px" }}>Date Recieved</div>
                    </div>
                    <div className="inbox-list h-fit w-full bg-[#f3f3f3] flex items-center cursor-pointer hover:bg-[#e5e5e5]" onDoubleClick={handleOpenMailWindow}>
                        <div className="w-[25%] name">{highlightMatch("Yashodhar")}</div>
                        <div className="w-[45%] subject">{highlightMatch("Thank you for visiting my portfolio")}</div>
                        <div className="w-[30%] date">{highlightMatch(formattedDate)}</div>
                    </div>
                </>
            ) : (
                <div className="h-full w-full select-none" style={{ padding: '4px' }}>
                    <p>{highlightMatch("Dear Visitor,")}</p>
                    <br />
                    <p>
                        {highlightMatch(
                            "Thank you for taking the time to explore my portfolio website. I appreciate your interest in my work and hope you found the content engaging and informative."
                        )}
                    </p>
                    <br />
                    <p>
                        {highlightMatch(
                            "If you have any questions, feedback, or potential opportunities you'd like to discuss, feel free to reach out. I'm always open to meaningful conversations and collaboration."
                        )}
                    </p>
                    <br />
                    <p>
                        {highlightMatch("You can contact me at: ")}
                        <a href="mailto:yashodhar2907@gmail.com" className="text-blue-500 underline">
                            {highlightMatch("yashodhar2907@gmail.com")}
                        </a>
                    </p>
                    <br />
                    <p>
                        {highlightMatch("Warm regards,")}
                        <br />
                        {highlightMatch("Yashodhar")}
                    </p>
                </div>

            )}
        </div>
    )
}

const MailSent = () => {
    return (
        <div className="hello h-full w-full">
            <div className="top-info-section flex h-fit select-none items-center justify-between"
                style={{ background: 'linear-gradient(rgb(213, 213, 213), rgb(233 232 232))' }}>
                <div className='w-[25%] outline outline-gray-400' style={{ padding: "0px 4px" }}>To</div>
                <div className='w-[45%] outline outline-gray-400' style={{ padding: "0px 4px" }}>Subject</div>
                <div className='w-[30%] outline outline-gray-400' style={{ padding: "0px 4px" }}>Date Sent</div>
            </div>
            <p className='text-center'>No sent emails</p>
        </div>
    )

}





const Mail = () => {
    const [activePage, setActivePage] = useState('inbox');
    const [isMailWindowOpen, setIsMailWindowOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleBackButton = () => {
        if (activePage == 'inbox')
            setIsMailWindowOpen(false);
    }

    const showNotification = () => {
        toast.info("Feature coming soon", {
            containerId: "mail-app-toast",
            autoClose: 4000,
            closeButton: true,
            transition: Slide,
            className: "mac-toast",
            bodyClassName: "mac-toast-body"
        });
    };

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
                <div className="address-button">
                    <button onClick={handleBackButton}>
                        <img src={back} alt="" />
                    </button>
                    back
                </div>

                <div className="flex-1"></div>


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
                    <button onClick={showNotification}>
                        <img src={paperPencil} alt="New" />
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

                    <input
                        type="text"
                        className="rounded-2xl bg-white glow-on-focus mail-input h-7"
                        style={{ padding: "0px 8px" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <p>Search</p>
                </div>

            </div>

            <div className="main-mail-content flex h-full w-full select-none" style={{ height: "calc(100% - 62px)" }}>
                <div className="hamburger w-36 h-full bg-[#dae0eb] flex flex-col gap-y-2 border-r border-gray-400">
                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{ padding: "4px" }} onClick={() => setActivePage('inbox')}>
                        <img src={inbox} alt="" className='h-6' />
                        <p>Inbox</p>
                    </div>
                    <div className="mail-option h-11 flex items-center gap-x-2 hover:bg-[#A2B2CA]" style={{ padding: "4px" }} onClick={() => setActivePage('sent')}>
                        <img src={paperPlane} alt="" className='h-6' />
                        <p>Sent</p>
                    </div>

                </div>

                <ToastContainer
                    containerId="mail-app-toast"
                    position="top-right"
                    newestOnTop
                    limit={3}
                    closeOnClick
                    draggable={false}
                    pauseOnHover
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1000,
                        width: '300px',
                        pointerEvents: 'auto', // allow clicking on toasts
                    }}
                />
                <div className="main-screen w-[90%] h-full ">


                    {activePage == 'inbox' ? (
                        <MailInbox
                            isWindowOpen={isMailWindowOpen}
                            setIsWindowOpen={setIsMailWindowOpen}
                            searchQuery={searchQuery}
                        />

                    ) : (
                        <MailSent />
                    )}
                </div>
            </div>

        </SimpleFrame>
    )
}

export default Mail