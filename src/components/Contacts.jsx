import React, { useState, useRef, useEffect } from 'react'
import './component.css'
import SimpleFrame from './SimpleFrame'
import texture from '../assets/texture.avif'
import appleLogo from "../../public/appleLogo.svg"
import userLogo from "../../public/userLogo.svg"
import Yashodhar from './Yashodhar'
import Apple from './Apple'


const Contacts = () => {
    const [isFirstChatSelected, setIsFirstChatSelected] = useState(true)
    const inputRef = useRef(null);
    const [searchString, setSearchString] = useState('')
    useEffect(() => {
        inputRef.current.focus(); // Focuses input on component mount
    }, []);


    const selectFirstChat = () => {
        setIsFirstChatSelected(true);
    }
    const selectSecondChat = () => {
        setIsFirstChatSelected(false);
    }

    useEffect(() => {

    }, [searchString])

    const highlightMatch = (text, search) => {
        if (!search) return text;

        const index = text.toLowerCase().indexOf(search.toLowerCase());
        if (index === -1) return text;

        const before = text.substring(0, index);
        const match = text.substring(index, index + search.length);
        const after = text.substring(index + search.length);

        return (
            <>
                {before}
                <span className="bg-blue-300 rounded px-1">{match}</span>
                {after}
            </>
        );
    };


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

            <div className="search-title relative h-8 w-full flex items-center justify-end" style={{ padding: "0px 12px" }} >
                <input type="text" ref={inputRef} placeholder='search' focused="true" className='bg-white rounded-xl focus:outline-none' style={{ padding: "0px 8px", boxShadow: "0px 0px 4px 4px #87AED0" }} onChange={(e) => setSearchString(e.target.value)} />
            </div>

            <div className="address-section flex h-[90%] w-full justify-between items-center" style={{ padding: "0px 12px", marginTop: "4px" }}>
                <div className="address-name w-[30%] h-full flex flex-col items-center gap-y-2 bg-white">
                    <p className="w-full bg-gray-200 flex justify-center">Name</p>

                    <div className="w-full flex gap-x-1 items-center cursor-pointer hover:bg-gray-100" style={{ padding: "0px 12px" }} onClick={selectFirstChat}>
                        <img loading='lazy' src={userLogo} alt="" className='h-5' />
                        <p>{highlightMatch("Yashodhar Chavan", searchString)}</p>
                    </div>

                    <div className="w-full flex gap-x-1 items-center cursor-pointer hover:bg-gray-100" style={{ padding: "0px 12px" }} onClick={selectSecondChat}>
                        <img loading='lazy' src={appleLogo} alt="" className='h-5' />
                        <p>{highlightMatch('Apple', searchString)}</p>
                    </div>
                </div>
                <div className="bg-transparent h-full w-[1%] flex text-white justify-center items-center font-bold">
                    .
                </div>
                <div className="address-value w-[69%] h-full bg-white">
                    {isFirstChatSelected ? (
                        < Yashodhar highlightMatch={highlightMatch} searchString={searchString} showPadding={false} />
                    ) : (
                        <Apple highlightMatch={highlightMatch} searchString={searchString} showPadding={true}/>
                    )}
                </div>
            </div>
        </SimpleFrame>
    )
}

export default React.memo(Contacts);