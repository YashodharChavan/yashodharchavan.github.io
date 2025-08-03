import React, { useState, useRef } from 'react'
import SimpleFrame from './SimpleFrame'
import './component.css'
import paperPlane from '../assets/paperPlane.svg'
import paperClip from '../assets/paperClip.svg'


const Mail = () => {

    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [showFontDropdown, setShowFontDropdown] = useState(false);
    const [selectedFont, setSelectedFont] = useState('sans-serif');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileCount, setFileCount] = useState(0)


    const handleButtonClick = () => {
        console.log("hello")
        fileInputRef.current.click(); // Trigger hidden input
    };

    const roundToTwoDecimals = (num) => Math.round(num * 100) / 100;

    const fileInputRef = useRef(null);

    const handleFontChange = (font) => {
        setSelectedFont(font);
        setShowFontDropdown(false);
        document.getElementById('email-draft').style.fontFamily = font;
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        // Check file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Only PNG, JPG, JPEG, and PDF are allowed.');
            return;
        }

        // Check file size (10MB max)
        const maxSizeMB = 10;
        if (file.size > maxSizeMB * 1024 * 1024) {
            alert('File size exceeds 10MB limit.');
            return;
        }

        // Proceed with file upload or processing
        console.log('File accepted:', file);
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
        setFileCount(fileCount + 1)
    };

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
            <div className="top-mail-bar h-fit flex select-none items-center justify-between" style={{ padding: "4px 12px", backgroundImage: "linear-gradient(rgb(204, 204, 204), rgb(213 213 213))" }}>
                <div className='flex gap-x-2'>
                    <div className="address-button">
                        <button >
                            <img loading='lazy' src={paperPlane} alt="" />
                        </button>
                        <p>Send</p>
                    </div>
                    
                    <div className="address-button">
                        <button onClick={handleButtonClick}>
                            <img loading='lazy' src={paperClip} alt="" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept=".avif,.avif,.avif,.pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <p>Attach</p>
                    </div>
                    
                    <div className="address-button relative">
                        <button className='italic font-serif text-white' onClick={() => setShowFontDropdown(!showFontDropdown)}>A</button>
                        <p>Fonts</p>
                    
                        {showFontDropdown && (
                            <div className="absolute top-full left-0 bg-white w-20 border border-gray-300 shadow-md rounded-md z-50 mt-1">
                                {['sans-serif', 'serif', 'monospace', 'cursive'].map((font) => (
                                    <div
                                        key={font}
                                        onClick={() => handleFontChange(font)}
                                        className="px-4 py-1 hover:bg-gray-200 cursor-pointer"
                                        style={{ fontFamily: font }}
                                    >
                                        {font}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {fileCount > 0 ?  (
                    
                    
                    <div className="attachment-details">
                    <p>attached {fileCount} file(s)</p>
                    <p>total Size: {roundToTwoDecimals(selectedFiles.reduce((total, file) => total + file.size, 0) / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                ): 
                (
                    <div className="attachment-details">
                    {/* <p>no attachments</p> */}
                </div>
                )}

            </div>  



            <div className="email-header-fields h-fit select-none w-full flex items-center justify-center bg-[#ECECEC]" style={{ padding: "8px 0px" }}>
                <div className="email-details w-4/5 select-none bg-[#ECECEC] h-full flex items-center gap-x-2">
                    <div className="flex flex-col gap-y-3 names">
                        <p>Your Email: </p>
                        <p>Subject: </p>
                    </div>


                    <div className="flex flex-col gap-y-3 fields w-4/5">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='enter your email' className='mail-input glow-on-focus w-full bg-white' />
                        <input type="text" onChange={(e) => setSubject(e.target.value)} placeholder='enter subject' className='mail-input glow-on-focus w-full bg-white' />
                    </div>
                </div>
            </div>

            <div className="w-full h-[calc(100% - 135px)]" style={{
                height: "calc(100% - 135px)"
            }}>
                <textarea name="email-draft" id="email-draft" className='h-[98%] w-full resize-none outline-none' style={{ padding: "4px" }}>


                </textarea>
            </div>


        </SimpleFrame>
    )
}

export default React.memo(Mail);