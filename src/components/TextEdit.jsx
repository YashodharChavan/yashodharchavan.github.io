import React, { useEffect, useState, useRef } from 'react';
import SimpleFrame from './SimpleFrame';
import './component.css';

const TextEdit = () => {
    const [text, setText] = useState('')

    const textareaRef = useRef(null);


    const handleTextChange = (e) => {
        setText(e)
    }

    useEffect(() => {
        const handleSaveShortcut = (e) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            if (isCtrlOrCmd && e.key === 's') {
                e.preventDefault(); // Prevent browser save dialog

                // ✅ Your save logic here
                console.log('Ctrl + S pressed. Saving...');
                setText(textareaRef.current.textContent)
                // You can call an API, update local storage, or show a toast
            }
        };

        window.addEventListener('keydown', handleSaveShortcut);
        return () => window.removeEventListener('keydown', handleSaveShortcut);
    }, []);


    return (
        <SimpleFrame
            title="Untitled"
            id="textedit"
            icon="textEdit"
            isResizable={true}
            height="400"
            width="500"
            minHeight="400"
            minWidth="500"
            optionalBackground={null}
        >
            <div className="text-content h-[85%] w-full">
                <h1>The save logic is not yet created I will create it at the time of file system</h1>
                <div
                    ref={textareaRef}
                    id="text-content-area"
                    className="text-content-area w-full h-full focus:outline-none outline-none bg-transparent p-4"
                    contentEditable="true"
                />
            </div>
        </SimpleFrame>
    );
};

export default TextEdit;