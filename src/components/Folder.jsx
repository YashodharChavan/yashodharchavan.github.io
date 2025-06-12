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
        setCurrentFileURL(node.download_url); // No headers needed
    }
};



    const toggle = async () => {
    if (node.type !== 'dir') return;
    if (!expanded) {
        setLoading(true);
        try {
            const res = await fetch(node.url);
            const data = await res.json();

            if (Array.isArray(data)) {
                setChildren(data);
            } else {
                console.error("Expected array but got:", data);
                setChildren([]);
            }
        } catch (err) {
            console.error("Error fetching directory contents:", err);
            setChildren([]);
        } finally {
            setLoading(false);
        }
    }
    setExpanded(prev => !prev);
};





    return (
        <div style={{ paddingLeft: `${paddingValue + 12}px` }} >
            <div
                onClick={toggle}
                className="flex items-center gap-1 cursor-pointer select-none group max-w-full"
                title={node.name}

            >
                <span className="truncate max-w-[200px] w-full" >

                    {node.type === 'dir' ? (
                        <div className='flex gap-x-0.5 hover:bg-gray-300' onClick={(e) => e.target.classList.toggle('folder-toggle')}>
                            <img src={genericFolder} alt="" className='h-6' />
                            {node.name}
                        </div>
                    ) : (
                        <div className='flex gap-x-0.5 hover:bg-gray-300' onClick={() => handleFileClick(node)}>
                            <img src={fileIcon} alt="" className='h-6' />
                            {node.name}
                        </div>
                    )}
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
        .then(setTreeData)
        .catch(err => console.error("Initial fetch error:", err));
}, []);

    return (
        <div>
            <h2 className="font-bold mb-2 select-none">📦 mac-os-10.4-X-tiger</h2>
            {treeData.map(item => (
                <TreeNode key={item.path} node={item} currentFileURL={currentFileURL} setCurrentFileURL={setCurrentFileURL} />
            ))}
        </div>
    );
};

export default Folder;
