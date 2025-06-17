import React, { useEffect, useState, useRef } from 'react';
import SimpleFrame from './SimpleFrame';
import './component.css';
import { fileSystem } from './Utils/fileSystem';
const TextEdit = ({ title = "Untitled.txt", optionalText = "" }) => {

    const [fileNode, setFileNode] = useState(findFileNode(fileSystem, title));

    const [text, setText] = useState(fileNode?.content || optionalText);

    const createFileInDesktop = () => {
        const desktop =
            fileSystem['/'].children.Users.children.yashodhar.children.Desktop.children;
        if (!desktop[title]) {
            desktop[title] = {
                type: 'file',
                content: optionalText,
            };
            console.log(`Created new file '${title}' in Desktop`);
        }
        return desktop[title];
    };

    const textareaRef = useRef(null);


    function findFileNode(fileSystem, filename) {

        function searchDir(dir) {
            for (const [key, value] of Object.entries(dir)) {
                if (value.type === 'file' && key === filename) {
                    return value;
                } else if (value.type === 'dir') {
                    const found = searchDir(value.children);
                    if (found) return found;
                }
            }
            return null;
        }
        return searchDir(fileSystem['/'].children);
    }

    const handleTextChange = (value) => {
        setText(value);

        // Create the file if it doesn't exist yet
        let node = fileNode;
        if (!node) {
            node = createFileInDesktop();
            setFileNode(node); // Save reference for later
        }

        if (node && node.type === 'file') {
            node.content = value;
        }
    };

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