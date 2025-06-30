import React from 'react';
import art9 from '../assets/icons/art9.png';
import art10 from '../assets/icons/art10.png';
import macOsXTiger from '../assets/projects/macOSXTiger.png';
import photoEnhancer from '../assets/projects/photoEnhancer.png';
import emailLess from '../assets/projects/emailLessCompose.png';
import folderVisualizer from '../assets/projects/folderVisualizer.png';
import linkToQrCode from '../assets/projects/linkToQrCode.png';
import onlineHTMLEditor from '../assets/projects/onlineHTMLEditor.png';
import oxygenWeather from '../assets/projects/oxygenWeather.png';
import webDrawer from '../assets/projects/webDrawer.png';
import bForm from '../assets/projects/BForm.png';
import ReactMarkdown from 'react-markdown';
import github from '../assets/icons/github.svg'
import back from '../assets/back.svg'


const Projects = () => {
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const hoverTimeout = React.useRef(null);
    const projects = [
        {
            title: 'macOS X Tiger Clone (React)',
            image: macOsXTiger,
            tools: ['React', 'Tailwind CSS', 'JavaScript'],
            description: 'A realistic simulation of macOS X Tiger with desktop, terminal, file system, and draggable windows.',
            link: "https://github.com/YashodharChavan/mac-os-10.4-X-tiger",
            details: `### macOS X Tiger Clone

A React-based recreation of macOS X Tiger with:

- Draggable windows
- Terminal emulator
- File system UI
- Styled to reflect early 2000s Apple aesthetics`,
        },
        {
            title: 'Oxygen Weather App (React Native)',
            image: oxygenWeather,
            tools: ['React Native', 'Tailwind CSS', 'Expo'],
            description: 'A beautiful weather app made with React Native and Expo, using WeatherAPI.',
            link: "https://github.com/YashodharChavan/oxygen-weather-app",
            details: `### Oxygen Weather App

Built with **React Native** and **Expo**:

- Uses WeatherAPI.com
- Location-based weather
- Styled with Tailwind for mobile`,
        },
        {
            title: 'Indian Railways B-Form Automation',
            image: bForm,
            tools: ['Google Apps Script', 'Excel', 'Google Sheets'],
            description: 'Automates IC/NON-IC data generation from ICMNTR sheet via Apps Script.',
            link: "https://www.google.com",
            details: `### Indian Railways B-Form Automation

A Google Sheets tool that:

- Imports and parses ICMNTR sheet from FOIS
- Separates IC and NON-IC entries
- Generates Master, IC, NON-IC sheets
- Supports download of filtered Excel files`,
        },
        {
            title: 'Photo Enhancer (Java Swing)',
            image: photoEnhancer,
            tools: ['Java', 'Java Swing'],
            description: 'A desktop GUI for basic photo enhancement using Java Swing.',
            link: "https://github.com/YashodharChavan/Photo-Enhancer-Java",
            details: `### Photo Enhancer

Built in Java Swing, allows:

- Brightness/contrast adjustments
- Simple filters (greyscale, invert)
- Desktop UI using native Java GUI`,
        },
        {
            title: 'Link to QR Code Generator',
            image: linkToQrCode,
            tools: ['React', 'react-qr-code'],
            description: 'Generates QR code for links using React and `react-qr-code`.',
            link: "https://github.com/YashodharChavan/Link-to-QR-code",
            details: `### QR Code Generator

Paste a link and instantly generate its QR code.

- Built with React
- Uses \`react-qr-code\` package
- Minimal clean UI`,
        },
        {
            title: 'Folder Visualizer (Java Swing)',
            image: folderVisualizer,
            tools: ['Java', 'Java Swing'],
            description: 'A visual file/folder tree built using Java Swing.',
            link: "https://github.com/YashodharChavan/folder-visualizer",
            details: `### Folder Visualizer

Desktop tool to browse directories in a tree layout.

- Uses Java Swing's \`JTree\`
- Displays folder structure
- Clickable folders with expand/collapse`,
        },
        {
            title: 'Online HTML Editor (React)',
            image: onlineHTMLEditor,
            tools: ['React', 'Tailwind CSS', 'ace-builds'],
            description: 'Live HTML editor with syntax highlighting.',
            link: "https://github.com/YashodharChavan/online-html-editor",
            details: `### Online HTML Editor

Live-edit HTML and see the result.

- Uses Ace Editor for syntax
- Live preview pane
- Built in React + Tailwind`,
        },
        {
            title: 'Email Composer with NodeMailer',
            image: emailLess,
            tools: ['React', 'Node.js', 'NodeMailer'],
            description: 'A contact form app that sends email using NodeMailer backend.',
            link: "https://github.com/YashodharChavan/email-less-compose",
            details: `### Email Composer

Full-stack email tool:

- Frontend in React
- Backend with Express
- Sends emails via NodeMailer`,
        },
        {
            title: 'Web Drawing Tool (React)',
            image: webDrawer,
            tools: ['React', 'Canvas API'],
            description: 'Freehand web drawing app using HTML5 Canvas.',
            link: "https://github.com/YashodharChavan/web-canvas-drawer",
            details: `### Web Drawing Tool

- Built using HTML5 \`canvas\`
- Supports color, thickness
- Responsive for mobile and desktop`,
        },
    ];

    return (
        <>
            {selectedProject === null ? (
                <div className="min-h-screen w-full bg-[#ECF2F9]">
                    <div className="topbar font-bold text-lg sm:text-xl" style={{ padding: "12px 24px" }}>Yashodhar</div>
                    <hr className="gradient-hr" />
                    {/* Header */}
                    <div className="landing-container w-full relative bg-[#ECF2F9] background-inset" style={{ padding: "64px 24px" }}>
                        <div className="introduction m-auto w-full h-full py-8 sm:py-16 flex flex-col items-center justify-center gap-4 sm:gap-6">
                            <h1 className="text-4xl font-bold text-center">
                                My Projects
                            </h1>
                            <p className="w-full text-center text-base font-medium">
                                I believe true learning happens through building. Every time I explore something new, my imagination sparks ideas—and I bring them to life through projects.
                            </p>
                            <div className="m-auto px-4 sm:px-6 select-none py-2 sm:py-3 rounded-2xl w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300">
                                <p className="text-sm sm:text-base" style={{ padding: "4px 12px" }}>Explore</p>
                            </div>
                            <div className="absolute bg-[#8493FF] h-4 w-4 right-[20%] top-[20%] blur-lg glow-one"></div>
                            <img src={art9} alt="" draggable="false" className="h-24 select-none w-fit absolute top-[70%] right-[5%] float-animation-slow" />
                            <img src={art10} alt="" draggable="false" className="h-24 select-none w-fit absolute top-[10%] left-[5%] float-animation" />
                        </div>
                    </div>

                    {/* Grid */}
                    <hr className="gradient-hr" />
                    <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-rose-500" style={{ padding: "24px 0px" }}>
                        Technical Skills:
                    </h1>

                    <div
                        className="grid gap-6"
                        style={{
                            gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))",
                            padding: "0px 32px 32px 32px"
                        }}
                    >
                        {projects.map((project, index) => {
                            const isHovered = hoveredIndex === index;

                            return (
                                <div
                                    key={index}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => setSelectedProject(project)}
                                    className="card min-w-64 flex flex-col items-center rounded-md outline outline-gray-300 bg-white shadow-md gap-y-2.5 transition-all duration-300 cursor-pointer"
                                    style={{
                                        padding: "4px",
                                        transform: isHovered ? "translate(-10px, -10px)" : "none",
                                        boxShadow: isHovered ? "0px 0px 10px 0px #484848" : "0 1px 3px 0 rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <img src={project.image} className="h-fit w-full" />

                                    <h1 className="font-medium text-xl text-center">{project.title}</h1>
                                    <div className="flex gap-x-1 flex-wrap justify-center gap-y-1">
                                        {project.tools.map((tool, toolIdx) => (
                                            <div
                                                key={toolIdx}
                                                className="rounded-full w-fit border-2 text-sm"
                                                style={{ borderColor: '#9999ff', padding: "0px 4px" }}
                                            >
                                                {tool}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-white flex flex-col gap-y-3.5" style={{ padding: "18px 24px" }}>
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="border border-[#7F8A9A] w-14 h-7 rounded-3xl cursor-pointer flex justify-center items-center"
                        style={{ background: "linear-gradient(to bottom, #C5CDD9 0%, #AAB5C7 50%, #BFC7D5 100%)" }}
                    >
                        <img src={back} alt="" className="h-4/5" />
                    </button>

                    <div className="flex items-center justify-between">

                        <h1 className="text-3xl font-bold mb-4">{selectedProject.title}</h1>
                        <a
                            href={selectedProject.link}
                            target="_blank"
                            className="bg-red-400 rounded-full flex items-center justify-between gap-x-2"
                            style={{padding: "4px 8px"}}
                        >   
                            <img src={github} className="h-6 w-fit" />
                            <span>Visit</span>
                        </a>
                    </div>
                    <img src={selectedProject.image} className="w-full max-w-3xl rounded-lg" />
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool, i) => (
                            <div key={i} className="px-3 py-1 border-2 rounded-full text-sm" style={{ padding: "0px 4px", borderColor: "#9999ff" }}>{tool}</div>
                        ))}
                    </div>
                    <div className="prose max-w-3xl">
                        <ReactMarkdown>{selectedProject.details}</ReactMarkdown>
                    </div>
                </div>
            )}
        </>
    );
};

export default Projects;
