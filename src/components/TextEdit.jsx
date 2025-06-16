import React, { useEffect, useState, useRef } from 'react';
import SimpleFrame from './SimpleFrame';
import './component.css';
import { fileSystem } from './Utils/fileSystem';
const TextEdit = ({ title="Untitled", optionalText=""}) => {
    const [text, setText] = useState(optionalText)

    const textareaRef = useRef(null);


    const handleTextChange = (e) => {
        setText(e)

    }

    useEffect(() => {
        const handleSaveShortcut = (e) => {
            const isCtrlOrCmd = e.ctrlKey || e.metaKey;
            if (isCtrlOrCmd && e.key === 's') {
                e.preventDefault();

                // ✅ Your save logic here
                console.log('Ctrl + S pressed. Saving...');
                setText(textareaRef.current.textContent)
            }
        };

        window.addEventListener('keydown', handleSaveShortcut);
        return () => window.removeEventListener('keydown', handleSaveShortcut);
    }, []);


    return (
        <SimpleFrame
            title={title} 
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
                <textarea
                    ref={textareaRef}
                    id="text-content-area"
                    className="text-content-area w-full h-[116%] resize-none focus:outline-none outline-none bg-transparent p-4"
                    onChange={(e) => handleTextChange(e.target.value)}
                    value={text}
                />
            </div>
        </SimpleFrame>
    );
};

export default TextEdit;