import React from 'react'
import appleLogo from "../../public/appleLogo.svg"

const Apple = ({highlightMatch, searchString, showPadding}) => {
    return (
        <div className="flex flex-col justify-between h-[80%] items-center"
            style={{padding: showPadding ? "0px 8px" : "0px"}}
        >
            <div className="logo-and-name h-14 w-full  flex justify-center gap-x-4 text-2xl items-center">
                <img src={appleLogo} alt="Apple Logo" className='h-10' />
                <p className='font-bold'>Apple Computer Inc.</p>
            </div>


            <div className="contact-details mt-4 w-full">
                <div className="main">
                    <p>{highlightMatch("Main: ", searchString)} </p>
                    <p>{highlightMatch("1-800-MY-APPLE", searchString)}</p>
                </div>

                <div className="home-page">
                    <p>{highlightMatch("Home Page: ", searchString)}</p>
                    <a href="https://www.apple.com">{highlightMatch("https://www.apple.com", searchString)}</a>
                </div>

                <div className="work">
                    <p>{highlightMatch("Work:", searchString)}</p>
                    <p>{highlightMatch("1 Infinite Loop Cupertino CA 95014 United States", searchString)}</p>            
                </div>
            </div>

            <div className="notes text-gray-500 mt-4 w-full text-sm">
                <hr />
                <p className='font-bold'>{highlightMatch("Notes:", searchString)}</p>
            </div>
        </div>
    )
}

export default Apple