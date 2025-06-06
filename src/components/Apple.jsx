import React from 'react'
import appleLogo from "../../public/appleLogo.svg"

const Apple = () => {
    return (
        <div className="flex flex-col justify-between h-[60%] items-center">
            <div className="logo-and-name h-14 w-full  flex justify-center gap-x-4 text-2xl items-center">
                <img src={appleLogo} alt="Apple Logo" className='h-10' />
                <p className='font-bold'>Apple Computer Inc.</p>
            </div>


            <div className="contact-details mt-4 w-full">
                <div className="main">
                    <p>Main: </p>
                    <p>1-800-MY-APPLE</p>
                </div>

                <div className="home-page">
                    <p>Home Page: </p>
                    <a href="https://www.apple.com">https://www.apple.com</a>
                </div>

                <div className="work">
                    <p>Work: </p>
                    <p>1 Infinite Loop Cupertino CA 95014 United States</p>            
                </div>
            </div>

            <div className="notes text-gray-500 mt-4 w-full text-sm">
                <hr />
                <p className='font-bold'>Notes:</p>
            </div>
        </div>
    )
}

export default Apple