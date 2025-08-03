import React, { useEffect, useState, useRef } from 'react';
import SimpleFrame from './SimpleFrame';
import './component.css';
import { fileSystem } from './Utils/fileSystem';
const TextEdit = ({ title = "Untitled.txt", optionalText = "", optionalPath = null }) => {
    const [fileNode, setFileNode] = useState(() => findFileNode(fileSystem, title, optionalPath));
    const [text, setText] = useState(optionalText || fileNode?.content || "");
    const textareaRef = useRef(null);


    useEffect(() => {
        console.log(optionalPath)
    }, [optionalPath])

    
    function findFileNode(fileSystem, filename, fullPath = null) {
        const root = fileSystem['/'].children;

        // If a full absolute path is provided (e.g., "/Users/yashodhar/Desktop/notes.txt")
        if (fullPath && typeof fullPath === 'string') {
            const segments = fullPath.split('/').filter(Boolean); // removes empty strings
            let current = root;

            for (let i = 0; i < segments.length - 1; i++) {
                const dir = segments[i];
                if (current[dir] && current[dir].type === 'dir') {
                    current = current[dir].children;
                } else {
                    current = null;
                    break;
                }
            }

            const fileNameFromPath = segments[segments.length - 1];
            if (current && current[fileNameFromPath] && current[fileNameFromPath].type === 'file') {
                return current[fileNameFromPath];
            }
        }

        // Fallback to recursive search if not found via path
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

        return searchDir(root);
    }


    const createFileInDesktop = () => {
        const desktop = fileSystem['/'].children.Users.children.yashodhar.children.Desktop.children;
        if (!desktop[title]) {
            desktop[title] = {
                type: 'file',
                content: optionalText,
            };
            console.log(`Created new file '${title}' in Desktop`);
        }
        return desktop[title];
    };

    const handleTextChange = (value) => {
        setText(value);

        let node = fileNode;
        if (!node) {
            node = createFileInDesktop();
            setFileNode(node);
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


export default React.memo(TextEdit);