import React, { useState, useEffect } from 'react';
import genericFolder from '../assets/folders/GenericFolderIcon.ico'
import fileIcon from '../assets/folders/Document_1.ico'

const TreeNode = ({ node, currentFileURL, setCurrentFileURL }) => {
    const [children, setChildren] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paddingValue, setPaddingValue] = useState(0)

    const handleFileClick = (node) => {
        if (node.download_url) {
            setCurrentFileURL(node.download_url)
        }
    };


    const toggle = async () => {
        if (node.type !== 'dir') return;
        setPaddingValue()
        if (!expanded) {
            setLoading(true);
            const res = await fetch(node.url);
            const data = await res.json();
            setChildren(data);
            setLoading(false);
        }

        setExpanded(prev => !prev);
    };



    return (
        <div style={{ paddingLeft: `${paddingValue + 16}px` }} >
            <div
                onClick={toggle}
                className="flex items-center gap-1 cursor-pointer select-none group max-w-full"
                title={node.name}

            >
                {/* Arrow Indicator */}
                {/* {node.type === 'dir' && (
                    // <span className="w-4">
                    //     {expanded ? '▼' : '▶️'}
                    // </span>
                )} */}
                {/* Folder or File Icon */}
                <span className="truncate max-w-[180px]" >

                    {node.type === 'dir' ? (
                        <div className='flex gap-x-0.5'>
                            <img src={genericFolder} alt="" className='h-6' />
                            {node.name}
                        </div>
                    ) : (
                        <div className='flex gap-x-0.5' onClick={() => handleFileClick(node)}>
                            <img src={fileIcon} alt="" className='h-6' />
                            {node.name}
                        </div>
                    )}
                    {/* {node.type === 'dir' ? '📁' : '📄'} {node.name} */}
                </span>
            </div>

            {expanded && (
                <div className="pl-4">
                    {loading ? (
                        <div className="text-gray-500 text-sm">Loading...</div>
                    ) : (
                        children.map(child => (
                            <TreeNode key={child.path} node={child} currentFileURL={currentFileURL} setCurrentFileURL={setCurrentFileURL} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};


const Folder = ({ currentFileURL, setCurrentFileURL }) => {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/repos/YashodharChavan/mac-os-10.4-X-tiger/contents/')
            .then(res => res.json())
            .then(setTreeData);
    }, []);

    return (
        <div>
            <h2 className="font-bold mb-2">📦 mac-os-10.4-X-tiger</h2>
            {treeData.map(item => (
                <TreeNode key={item.path} node={item} currentFileURL={currentFileURL} setCurrentFileURL={setCurrentFileURL}/>
            ))}
        </div>
    );
};

export default Folder;
