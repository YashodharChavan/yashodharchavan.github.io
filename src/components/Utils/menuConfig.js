// menuConfig.js
// menuConfig.js
import HomeIcon from '../../assets/folders/HomeFolderIcon.ico';
import NetworkIcon from '../../assets/folders/GenericNetworkIcon.ico';
import IDiskIcon from '../../assets/folders/iDiskGenericIcon.ico';
import ApplicationsIcon from '../../assets/folders/ApplicationsFolderIcon.ico';

export const topMenuData = {
    file: [
        { label: "New Folder", type: "folder", active: true, action: () => console.log("New File") },
        { label: "New File", type: "file", active: true, action: () => console.log("New File") },
        { label: "New Burn Folder", type: "burn", active: true, action: () => console.log("New File") },
        { label: "Open With", active: false, action: () => console.log("Save File") },
        { label: "Print", active: false, action: () => console.log("Save File") },
        { label: "Duplicate", active: false, action: () => console.log("Save File") },
        { label: "Make Alias", active: false, action: () => console.log("Save File") },
        { label: "Get Info", active: false, action: () => console.log("Save File") },
    ],
    edit: [
        { label: "Undo", active: false, action: () => console.log("Undo") },
        { label: "Redo", active: false, action: () => console.log("Redo") },
        { label: "Cut", active: false, action: () => console.log("Cut") },
        { label: "Show Clipboard", active: true, action: () => console.log("Cut") },
    ],

    view: [
        { label: "As Icons", active: false, action: () => console.log("Zoom In") },
        { label: "As Columns", active: false, action: () => console.log("Zoom Out") },
        { label: "As List", active: false, action: () => console.log("Zoom Out") },
        { label: "Clean Up", active: false, action: () => console.log("Zoom Out") },
        { label: "Arrange By", active: false, action: () => console.log("Zoom Out") },
        { label: "Hide Toolbar", active: true, action: () => console.log("Zoom Out") },
        { label: "Show View Options", active: true, action: () => console.log("Zoom Out") },
    ],

    go: [
        { label: "Back", active: false, action: () => console.log("Zoom In") },
        { label: "Forward", active: false, action: () => console.log("Zoom Out") },
        { label: "Computer", active: true, action: () => console.log("Zoom Out") },
        { label: "Home", active: true, icon: HomeIcon, action: () => console.log("Zoom Out") },
        { label: "Network", active: true, icon: NetworkIcon, action: () => console.log("Zoom Out") },
        { label: "iDisk", active: true, icon: IDiskIcon, action: () => console.log("Zoom Out") },
        { label: "Applications", active: true, icon: ApplicationsIcon, action: () => console.log("Zoom Out") },
        { label: "Recent Folders", active: false, action: () => console.log("Zoom Out") },
    ],
    window: [
        { label: "Minimize", action: () => console.log("Minimize") },
        { label: "Maximize", action: () => console.log("Maximize") },
        { label: "Close", action: () => console.log("Close") },
    ],
    help: [
        { label: "About", action: () => console.log("About") },
    ]
};


export const dd = [
    {
        label: "File",
        options: [
            { label: "New Folder", active: true, action: () => console.log("New File") },
            { label: "Open", active: false, action: () => console.log("Open File") },
            { label: "Open With", active: false, action: () => console.log("Save File") },
            { label: "Print", active: false, action: () => console.log("Save File") },
            { label: "Duplicate", active: false, action: () => console.log("Save File") },
            { label: "Make Alias", active: false, action: () => console.log("Save File") },
            { label: "Get Info", active: false, action: () => console.log("Save File") },
        ],
    },
    {
        label: "Edit",
        options: [
            { label: "Undo", active: false, action: () => console.log("Undo") },
            { label: "Redo", active: false, action: () => console.log("Redo") },
            { label: "Cut", active: false, action: () => console.log("Cut") },
            { label: "Show Clipboard", active: true, action: () => console.log("Cut") },
        ],
    },
    {
        label: "View",
        options: [
            { label: "As Icons", active: false, action: () => console.log("Zoom In") },
            { label: "As Columns", active: false, action: () => console.log("Zoom Out") },
            { label: "As List", active: false, action: () => console.log("Zoom Out") },
            { label: "Clean Up", active: false, action: () => console.log("Zoom Out") },
            { label: "Arrange By", active: false, action: () => console.log("Zoom Out") },
            { label: "Hide Toolbar", active: true, action: () => console.log("Zoom Out") },
            { label: "Show View Options", active: true, action: () => console.log("Zoom Out") },
        ],
    },
    {
        label: "Go",
        options: [
            { label: "Back", active: false, action: () => console.log("Zoom In") },
            { label: "Forward", active: false, action: () => console.log("Zoom Out") },
            { label: "Computer", active: true, action: () => console.log("Zoom Out") },
            { label: "Home", active: true, icon: '../assets/folders/HomeFolderIcon.ico', action: () => console.log("Zoom Out") },
            { label: "Network", active: true, icon: '../assets/folders/GenericNetworkIcon.ico', action: () => console.log("Zoom Out") },
            { label: "iDisk", active: true, icon: '../assets/folders/iDiskGenericIcon.ico', action: () => console.log("Zoom Out") },
            { label: "Applications", active: true, icon: '../assets/folders/ApplicationsFolderIcon.ico', action: () => console.log("Zoom Out") },
            { label: "Recent Folders", active: false, action: () => console.log("Zoom Out") },
        ],
    },
    {
        label: "Window",
        options: [
            { label: "Minimize", action: () => console.log("Minimize") },
            { label: "Maximize", action: () => console.log("Maximize") },
            { label: "Close", action: () => console.log("Close") },
        ]
    },
    {
        label: "Help",
        options: [
            { label: "About", action: () => console.log("About") },
        ]
    }
];

export const finderMenu = [
    { label: "New Folder", action: () => console.log("new folder") },
    { label: "New File", action: () => console.log("new file") },
    { label: "New Burn Folder", action: () => console.log("burn folder") },
    { label: "Get Info", action: () => console.log("Get info") },
]