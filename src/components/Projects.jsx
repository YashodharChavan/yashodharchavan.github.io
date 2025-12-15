import React, { useEffect } from 'react';
import art9 from '../assets/icons/art9.avif';
import art10 from '../assets/icons/art10.avif';
import macOsXTiger from '../assets/projects/macOSXTiger.avif';
import photoEnhancer from '../assets/projects/photoEnhancer.avif';
import linkToQrCode from '../assets/projects/linkToQrCode.avif';
import oxygenWeather from '../assets/projects/oxygenWeather.avif';
import bForm from '../assets/projects/BForm.avif';
import omSaiTradingAcademy from '../assets/projects/omSaiTradingAcademy.avif';
import railNova from '../assets/projects/railNova.avif';
import gpsWebsite from '../assets/projects/gpsWebsite.avif';
import onlineHtmlEditor from '../assets/projects/onlineHtmlEditor.avif';
import github from '../assets/icons/github.svg'
import website from '../assets/icons/website.svg';
import back from '../assets/back.svg'
import ProjectDetails from './ProjectDetails';
import { useRef } from 'react'

import './component.css';

const Projects = ({ onProjectOpen }) => {
    const projectsRef = useRef(null)
    const handleScrollToProjects = () => {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    const hoverTimeout = React.useRef(null);

    useEffect(() => {
        if (selectedProject !== null) {
            onProjectOpen?.();
        }
    }, [selectedProject]);

    const projects = [
        {
            title: 'macOS X Tiger Clone (React)',
            image: macOsXTiger,
            tools: ['React', 'Tailwind CSS', 'JavaScript'],
            description: 'A realistic simulation of macOS X Tiger with desktop, terminal, file system, and draggable windows.',
            githubLink: "https://github.com/YashodharChavan/yashodharchavan.github.io",
            websiteLink: "https://yashodharchavan.github.io",
            overview: "A desktop simulation of macOS X Tiger, built using React and Tailwind CSS. This project replicates key system behaviors from the classic Apple OS, including a functional terminal emulator, file system navigation, and draggable, resizable windows. Designed to closely match the aesthetics of early 2000s Apple UI, the clone serves as both a design experiment and a technical deep dive into managing complex state and interactive components in React.",
            features: [
                {
                    title: "🖥️ Functional Terminal Emulator",
                    description: "The terminal is fully functional and tightly integrated with the simulated file system. It mimics basic Unix commands and provides realistic feedback."
                },
                {
                    title: "📂 File System Navigation",
                    description: "The file system is modeled after macOS X Tiger, complete with folders, files, and interactive navigation."
                },
                {
                    title: "🪟 Draggable & Resizable Windows",
                    description: "Each window on the desktop can be dragged and resized, replicating a native desktop experience."
                },
                {
                    title: "🎨 Polished & Accessible UI",
                    description: "The interface is designed with a vintage Apple aesthetic and includes accessibility-focused design elements."
                }
            ],
            challenges: [
                {
                    title: "🛠️ Complex Window Management",
                    description: "Implementing draggable and resizable windows required precise state management, z-index tracking, and smooth UX across screen sizes."
                },
                {
                    title: "💻 Simulated Terminal Behavior",
                    description: "Creating a realistic terminal emulator involved parsing user input, mimicking command outputs, and syncing it with a virtual file system."
                },
                {
                    title: "📁 File System Modeling",
                    description: "Structuring a mock file system in memory and allowing dynamic navigation within it posed data modeling and rendering challenges."
                },
                {
                    title: "🎨 UI Aesthetic Matching",
                    description: "Replicating the early 2000s Apple UI involved fine-tuned styling, shadow layers, pixel-perfect spacing, and nuanced interaction behaviors."
                },
                {
                    title: "🔁 Component Reusability & State Isolation",
                    description: "Maintaining separation between multiple interactive components (windows, file manager, terminal) while managing global state was non-trivial and required careful architecture."
                }
            ],
            outcome: "The project successfully recreated a nostalgic and functional simulation of macOS X Tiger, complete with a responsive terminal, interactive file system, and draggable UI components. It not only evoked nostalgia through its vintage Apple design but also served as a deep technical exercise in managing complex state and UI interactions in React. The result was a polished desktop-like experience entirely in the browser, demonstrating both design fidelity and frontend engineering depth."
        },
        {
            title: 'Government Polytechnic Solapur – Official Website',
            image: gpsWebsite, // homepage screenshot (hero section recommended)
            tools: [
                'React',
                'FireCMS',
                'Firebase (Firestore)',
                'Tailwind CSS'
            ],
            description: 'A fully dynamic, CMS-driven redevelopment of the official Government Polytechnic Solapur website with zero backend hosting.',
            websiteLink: 'https://gpsolapur.ac.in',
            overview: "This project involved the complete UI and frontend redevelopment of the official Government Polytechnic Solapur website. The previous website was static, visually outdated, and difficult to maintain. Our goal was to modernize the interface while making all content fully dynamic and editable by non-technical staff. By integrating FireCMS with Firebase, we eliminated the need for a traditional backend and enabled real-time content management across the entire website.",
            features: [
                {
                    title: "🏠 Dynamic Home Page",
                    description: "Implemented a modern home page with sliders, minister profiles, and announcements — all dynamically managed through FireCMS without code changes."
                },
                {
                    title: "🏫 About & Institutional Timeline",
                    description: "Created an About section showcasing college information along with a structured historical timeline editable through the CMS."
                },
                {
                    title: "🏢 Departments & Staff Management",
                    description: "Built dedicated department sections containing vision, mission, and dynamically manageable staff profiles that can be added, updated, or removed via FireCMS."
                },
                {
                    title: "📄 Committees, Notices & AICTE Approvals",
                    description: "Enabled dynamic fetching and display of PDFs, notices, and AICTE approval documents directly from FireCMS collections."
                },
                {
                    title: "🏭 Facilities, Hostel & Visits",
                    description: "Developed facilities pages including labs, library, and hostel information, with hostel notices fetched dynamically. Industrial visits are presented using modals and carousels for an engaging UX."
                }
            ],
            challenges: [
                {
                    title: "🧩 Designing Without a Traditional Backend",
                    description: "Replacing a conventional backend with FireCMS required careful data modeling and strict structuring of Firestore collections to keep content scalable and maintainable."
                },
                {
                    title: "🎨 Modernizing a Government Website UI",
                    description: "Balancing a modern, user-friendly interface while maintaining the formal tone expected of an official government institution was a key design challenge."
                },
                {
                    title: "📂 CMS Usability for Non-Technical Staff",
                    description: "Ensuring that staff members could safely manage content without breaking layouts required thoughtful schema design and validation rules inside FireCMS."
                }
            ],
            outcome: "The redesigned website significantly improved usability, visual appeal, and maintainability compared to the earlier static version. Administrative staff can now manage notices, departments, PDFs, and institutional content independently without developer intervention. The project demonstrates practical experience in CMS-driven architecture, frontend scalability, and real-world deployment for a government institution.",
            teamwork: {
                information: "This project was developed by a 6-member team. I led the frontend development and CMS integration, designed reusable UI components, and structured Firestore collections for scalable content management. Collaboration was handled using Git-based workflows and VS Code Live Share.",
                team: [
                    'Yashodhar Chavan',
                    'Vaibhav Bansode',
                    'Yuvraj Gandhmal',
                    'Shruti Gajul',
                    'Rajveer Vadnal',
                    'Shravani Bhosale',
                ]
            }
        },
        {
            title: 'Indian Railways B-Form Automation',
            image: bForm,
            tools: ['Google Apps Script', 'Excel', 'Google Sheets'],
            description: 'Automates IC/NON-IC data generation from ICMNTR sheet via Apps Script.',
            // githubLink: "https://www.google.com",
            overview: "A data automation solution built directly within Google Sheets using embedded Google Apps Script, designed to streamline B-Form generation for Indian Railways. It parses the raw ICMNTR sheet, classifies entries into IC and NON-IC, and automatically generates structured sheets and downloadable PDF files. This approach significantly reduces manual effort and minimizes errors in handling operational railway data.",
            features: [
                {
                    title: "📥 ICMNTR Sheet Import",
                    description: "Automatically imports the raw ICMNTR operational data sheet directly into Google Sheets for processing."
                },
                {
                    title: "📊 IC & NON-IC Classification",
                    description: "Parses and filters the entries into IC (Interchange) and NON-IC categories based on predefined logic and keywords."
                },
                {
                    title: "🧠 Persistent UserOverrides for Data Corrections",
                    description: "Designed and implemented a UserOverrides mechanism to preserve officer-edited corrections across multiple FOIS Excel imports. Corrected values are stored separately and automatically reapplied after each data refresh, ensuring manual fixes are never lost."
                },
                {
                    title: "📝 Auto-Generated Master Sheets",
                    description: "Creates organized Master, IC, and NON-IC sheets dynamically within the same Google Sheets file—no manual sorting required."
                },
                {
                    title: "📤 Excel Export Functionality",
                    description: "Supports one-click download of generated IC/NON-IC Excel files for official use or reporting."
                },
                {
                    title: "⚙️ Built with Google Apps Script",
                    description: "Custom backend scripts automate data parsing, formatting, and export—fully serverless and cloud-integrated."
                }
            ],
            challenges: [
                {
                    title: "📊 Parsing Raw ICMNTR Data",
                    description: "The ICMNTR sheet had inconsistent formatting and required custom logic to reliably extract and normalize useful fields before processing."
                },
                {
                    title: "🔍 Accurate IC/NON-IC Classification",
                    description: "Developing a reliable classification algorithm was difficult due to edge cases, inconsistent labeling, and data ambiguities in the source file."
                },
                {
                    title: "📄 Automating Sheet Generation",
                    description: "Dynamically creating and updating multiple structured sheets (Master, IC, NON-IC) within Google Sheets required careful handling of sheet naming, duplication, and layout constraints."
                },
                {
                    title: "📤 Excel File Export Limitations",
                    description: "Exporting filtered data into downloadable Excel format from within Google Sheets involved working around limitations in Google Apps Script's export APIs."
                },
                {
                    title: "🔁 Iterative System Evolution",
                    description: "The system was rebuilt and refined across multiple versions, incorporating feedback from earlier attempts and addressing real-world data issues such as duplication, inconsistent rows, and complex siding logic."
                }

            ],
            outcome: "The tool proved to be a game-changer for railway officers by transforming a time-consuming, error-prone task into a fully automated process. What once took thousands of manual clicks and hours of analysis was reduced to just a few interactions. Officers who previously struggled with deciphering the massive and complex ICMNTR sheets found the automation intuitive, fast, and immensely helpful. By enabling instant classification, sheet generation, and Excel export, the solution not only saved time but also ensured consistency and accuracy. Its success highlighted how impactful thoughtful automation can be in streamlining bureaucratic workflows.",
            teamwork: {
                information: "This project was developed during industrial training at the DRM office of Indian Railways. I contributed significantly to the core automation logic, Excel parsing, summary generation, and system evolution across versions. The team actively collaborated on handling edge cases, validating outputs, and refining the overall workflow.",
                team: ['Yashodhar Chavan', 'Yuvraj Gandhmal', 'Shruti Gajul', 'Prajwal Hulle']
            }


        },
        {
            title: 'Om Sai Trading Academy – Landing Website (Client Project)',
            image: omSaiTradingAcademy, // homepage / form screenshot
            tools: ['HTML', 'CSS', 'JavaScript', 'Glide.js', 'Google Forms', 'Google Sheets'],
            description: 'A conversion-focused landing website for a Marathi trading academy with interactive UI, testimonials, media sliders, and lead capture integrated with Google Sheets.',
            githubLink: "https://github.com/YashodharChavan/omsai-trading-academy",
            websiteLink: "https://omsai-trading-academy.vercel.app",
            overview: "This project involved designing and developing a complete landing website for Om Sai Trading Academy after direct discussions with the founder, Dinesh Sir. The goal was to create a trustworthy, visually engaging platform for Marathi-speaking traders that clearly communicated value, mentor credibility, and learning outcomes. The website was structured as a full marketing funnel—from awareness and education to social proof and lead capture.",
            features: [
                {
                    title: "🚀 Conversion-Focused Landing Design",
                    description: "Designed a high-impact Marathi-first landing section with strong visual hierarchy, clear value messaging, and prominent call-to-action elements to drive webinar registrations."
                },
                {
                    title: "🧑‍🏫 Mentor Credibility & Trust Building",
                    description: "Implemented a dedicated mentor section highlighting teaching experience, background, and philosophy using professional visuals and long-form Marathi content to establish trust."
                },
                {
                    title: "⭐ Interactive Reviews & Proof of Results",
                    description: "Integrated student testimonials, images, and videos using Glide.js sliders to showcase real feedback, trading results, and appreciation screenshots."
                },
                {
                    title: "📝 Lead Capture with Google Sheets Integration",
                    description: "Built a modal-based registration form to collect student details and automatically store submissions in Google Sheets for easy access and follow-up."
                }
            ],
            challenges: [
                {
                    title: "🎨 Designing for Trust in a Financial Domain",
                    description: "Balancing vibrant visuals with credibility was crucial to ensure the site felt motivating without appearing misleading or aggressive."
                },
                {
                    title: "🧠 Converting Business Vision into UX",
                    description: "The client provided inspiration rather than strict requirements, requiring independent UX decisions to structure content logically and persuasively."
                },
                {
                    title: "⏱️ Hardware Constraints During Development",
                    description: "Development was briefly delayed due to a laptop battery failure, after which the entire website was completed rapidly once the issue was resolved."
                },
                {
                    title: "🌐 Deployment Not Completed",
                    description: "Although the website was fully developed and functional, hosting responsibility was handled externally and later paused due to a shift toward a course-based platform."
                }
            ],
            outcome: "The website was fully designed and developed in approximately 25 hours across three days, delivering a polished, client-ready landing experience. While the project was not deployed due to a later change in business direction, it demonstrates real-world experience in UI design, frontend development, third-party library integration, and practical lead capture using Google Sheets. The project reflects freelance-style client work rather than a purely academic exercise."
        },

        {
            title: 'RailNova – Railway Operations Dashboard',
            image: railNova,
            tools: [
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Node.js',
                'Express',
                'Supabase',
                'JWT',
                'Excel Processing'
            ],
            description: 'A role-based railway operations dashboard for Indian Railways officers to analyze B-Form data, forecasts, interchange status, and operational statistics.',
            githubLink: 'https://github.com/YashodharChavan/RailNova',
            websiteLink: 'https://rail-nova.vercel.app',
            overview: "RailNova was developed during industrial training to digitize and simplify B-Form analysis for railway officers. After an initial UI attempt was discarded, the project was rebuilt using the TailAdmin TypeScript template. Despite having no prior TypeScript experience, I replaced and customized nearly all components to match railway workflows. The system provides secure role-based access, Excel-driven data ingestion, and rich analytical dashboards tailored for operational decision-making.",
            features: [
                {
                    title: "🔐 Secure Role-Based Authentication",
                    description: "Implemented JWT-based authentication with protected routes and three user roles—Admin, Editor, and Viewer—ensuring sensitive railway data is accessed only by authorized users."
                },
                {
                    title: "📊 Interactive Dashboard & Analytics",
                    description: "Built responsive dashboards with interactive charts and hover-driven insights to visualize train movements, interchange statistics, wagon distribution, and forecast vs actual performance."
                },
                {
                    title: "📄 B-Form & Excel Data Processing",
                    description: "Enabled admins to upload B-Form Excel files, parse complex railway data, normalize routes, and store structured records in the database for real-time viewing and editing."
                },
                {
                    title: "⚙️ Administrative Controls & User Management",
                    description: "Provided admin-only features such as user management, controlled data uploads, swipe-to-clear database actions, and audit-safe overrides for edited operational data."
                }
            ],
            challenges: [
                {
                    title: "🧠 Learning TypeScript Under Production Pressure",
                    description: "The base template was written entirely in TypeScript, which required quickly understanding types, props, and strict checks while actively developing features."
                },
                {
                    title: "📊 Parsing Highly Irregular Excel Data",
                    description: "Railway B-Forms contained inconsistent formats, merged logic, and dual-direction data that required extensive validation, normalization, and custom parsing logic."
                },
                {
                    title: "🔒 Designing Secure Role Restrictions",
                    description: "Ensuring that only admins could upload, modify, or clear data while editors had limited edit access required careful backend and frontend enforcement."
                }
            ],
            outcome: "RailNova successfully transformed a manual, error-prone Excel-based workflow into a structured web dashboard for railway officers. The system enabled faster analysis, clearer visualization, and safer data handling. Although developed as a team project, I independently implemented nearly the entire frontend, backend APIs, authentication flow, data processing pipeline, and dashboard logic, making it one of my most technically intensive projects.",
            teamwork: {
                information: "This project was developed as part of industrial training. I took primary responsibility for the frontend implementation, backend APIs, authentication system, Excel data processing, and analytics dashboards, while the team collaborated on planning, validation, and domain understanding.",
                team: [
                    'Yashodhar Chavan',
                    'Yuvraj Gandhmal',
                    'Shruti Gajul',
                    'Prajwal Hulle'
                ]
            }

        },

        {
            title: 'Oxygen Weather App (React Native)',
            image: oxygenWeather,
            tools: ['React Native', 'Tailwind CSS', 'Expo'],
            description: 'A beautiful weather app made with React Native and Expo, using WeatherAPI.',
            githubLink: "https://github.com/YashodharChavan/oxygen-weather-app",
            overview: "Oxygen is a sleek, mobile-first weather application built with React Native, Tailwind CSS, and Expo. It fetches real-time weather data from WeatherAPI, providing users with location-based forecasts in a clean, responsive UI. The app focuses on performance and simplicity, offering a smooth user experience on both Android and iOS platforms.",
            features: [
                {
                    title: "📍 Location-Based Forecasts",
                    description: "The app uses device geolocation to fetch accurate, real-time weather data specific to the user's current location via WeatherAPI."
                },
                {
                    title: "📱 Cross-Platform Compatibility",
                    description: "Built with React Native and Expo, Oxygen works seamlessly on both Android and iOS devices, ensuring a consistent experience across platforms."
                },
                {
                    title: "⚡ Fast & Lightweight UI",
                    description: "Designed with Tailwind CSS and optimized for performance, the app loads quickly and responds fluidly to user input."
                },
                {
                    title: "🌦️ Real-Time Weather Display",
                    description: "Displays current weather conditions, temperature, humidity, and other essential data using a clean and readable layout."
                },
                {
                    title: "🎨 Minimal & Responsive Design",
                    description: "The app emphasizes simplicity and clarity, with an elegant, mobile-first layout that adapts beautifully to screen sizes."
                }
            ],
            challenges: [
                {
                    title: "📡 Geolocation Permissions & Handling",
                    description: "Implementing accurate location-based weather required handling user permissions across Android and iOS, along with fallback logic for denied access."
                },
                {
                    title: "🌐 API Rate Limiting & Data Handling",
                    description: "WeatherAPI had usage limits, so managing API calls efficiently without exceeding the quota—especially during live testing—was essential."
                },
                {
                    title: "📱 Cross-Platform Styling Consistency",
                    description: "Ensuring the UI looked and behaved the same across Android and iOS was tricky due to minor platform-specific quirks in React Native rendering."
                },
                {
                    title: "🌤️ Real-Time Data Updates",
                    description: "Ensuring the weather data updated consistently with minimal latency involved syncing state properly and dealing with asynchronous fetch behavior."
                },
                {
                    title: "📏 Responsive Layout in React Native",
                    description: "Designing a responsive interface that looked good on various screen sizes required experimenting with Tailwind-compatible styling and custom breakpoints."
                }
            ],
            outcome: "Oxygen Weather App was successfully developed as a sleek, cross-platform mobile application that delivers accurate, real-time weather updates using WeatherAPI. The app demonstrated smooth integration of geolocation services, efficient API usage, and responsive UI design tailored for both Android and iOS platforms. It not only achieved consistent performance and visual coherence across devices but also served as a strong showcase of building performant, mobile-first applications with React Native, Tailwind CSS, and Expo.",
            teamwork: {
                information: "This project was completed as part of a microproject for the course Environmental Education and Sustainability. Our team consisted of three members. I independently handled all the coding and application development, using documentation, tutorials, and AI assistance when needed. My teammates contributed to report writing, documentation formatting, and final printing tasks. This setup allowed me to take technical ownership while collaborating for overall project delivery.",
                team: ["Aditya Bhosale", "Yashodhar Chavan", "Suraj Rathod"]
            }
        },

        {
            title: 'Photo Enhancer (Java Swing)',
            image: photoEnhancer,
            tools: ['Java', 'Java Swing'],
            description: 'A desktop GUI for basic photo enhancement using Java Swing.',
            githubLink: "https://github.com/YashodharChavan/Photo-Enhancer-Java",
            overview: "A lightweight desktop application built using Java Swing that enables users to perform basic photo enhancements. It offers features like brightness and contrast adjustment, grayscale and invert filters, all packaged in an intuitive GUI. Designed with simplicity and speed in mind, it provides offline image editing capabilities without the need for heavy software.",
            features: [
                {
                    title: "💡 Brightness & Contrast Adjustment",
                    description: "Fine-tune image visibility with sliders for adjusting brightness and contrast in real-time."
                },
                {
                    title: "🖤 Grayscale & Invert Filters",
                    description: "Apply classic image effects like grayscale and invert to enhance or creatively modify your photos."
                },
                {
                    title: "🖼️ Instant Preview",
                    description: "Preview changes immediately on the canvas without needing to save or reload the image."
                },
                {
                    title: "🧰 Lightweight & Offline-Ready",
                    description: "Runs as a standalone Java application without the need for installation or internet connectivity."
                },
                {
                    title: "🧑‍💻 Built with Java Swing",
                    description: "Leverages Java Swing components to deliver a responsive, native-feel desktop interface."
                }
            ],
            challenges: [
                {
                    title: "🖼️ Image Processing in Java",
                    description: "Java Swing doesn't provide built-in support for advanced image manipulation. Had to manually implement brightness, contrast, grayscale, and invert algorithms using `BufferedImage` operations."
                },
                {
                    title: "⚡ Real-Time Preview Performance",
                    description: "Rendering image changes in real-time without noticeable lag required optimizing pixel-by-pixel operations and ensuring UI thread responsiveness with minimal redraw overhead."
                },
                {
                    title: "🧪 Ensuring Image Quality Retention",
                    description: "Applying filters without degrading image quality was a challenge. Carefully managed pixel transformations to prevent color banding and loss of detail."
                },
                {
                    title: "🧰 Building a User-Friendly UI in Swing",
                    description: "Creating an intuitive and clean interface with Java Swing demanded precise use of layout managers and custom component styling."
                },
                {
                    title: "📁 File I/O & Format Support",
                    description: "Supporting multiple image formats (like PNG, JPG) and handling file saving/loading robustly required integrating `ImageIO` and accounting for format limitations and exceptions."
                }
            ],
            outcome: "The Photo Enhancer application was successfully developed as a lightweight, offline image editing tool that delivers core enhancement features like brightness, contrast, grayscale, and inversion. It provided users with an intuitive Java Swing interface and responsive real-time previews. Despite the limitations of Java for image processing, the tool maintained high visual fidelity while offering essential editing capabilities. Its standalone, no-install nature made it ideal for quick desktop photo tweaks without relying on bulky software or internet access—making it both practical and accessible for everyday users.",
            teamwork: {
                information: "This project was selected as a microproject for the Java Programming course in my 4th semester. I was responsible for implementing the entire codebase, including designing the UI with Java Swing and integrating the core image enhancement logic (brightness, contrast, grayscale, invert), which was developed with the help of AI tools. My teammates contributed by designing a Figma prototype that mirrored the final application and managed project documentation and the presentation aspects effectively.",
                team: ['Yashodhar Chavan', 'Yuvraj Gandhmal', 'Prajwal Hulle']
            }

        },
        {
            title: 'Online HTML Editor & Live Preview Tool',
            image: onlineHtmlEditor, // editor + preview split screenshot
            tools: [
                'React',
                'Ace Editor',
                'JavaScript',
                'HTML',
                'CSS',
                'Tailwind CSS'
            ],
            description: 'A browser-based HTML editor with autosuggestions, syntax highlighting, dark/light mode, and real-time preview rendering.',
            githubLink: 'https://github.com/YashodharChavan/online-html-editor',
            websiteLink: 'https://online-html-editor-seven.vercel.app', // remove if not deployed
            overview: "This project is a developer-focused online HTML editor designed to provide a code-editor-like experience directly in the browser. It integrates Ace Editor to offer syntax highlighting, autosuggestions, and HTML snippets, combined with a live preview panel that renders the written markup in real time. The interface supports both dark and light themes and uses a responsive split-view layout to maintain usability across screen sizes. The editor is intentionally sandboxed within a constrained viewport to ensure layout stability while allowing scrolling for larger HTML outputs.",
            features: [
                {
                    title: "⌨️ Code Editor with Autosuggestions",
                    description: "Integrated Ace Editor with HTML mode, enabling syntax highlighting, live autocompletion, and built-in HTML snippets for faster and more accurate coding."
                },
                {
                    title: "⚡ Real-Time HTML Preview",
                    description: "Renders written HTML instantly in a dedicated preview panel using controlled DOM injection, allowing users to see layout changes without reloading."
                },
                {
                    title: "🌙 Dark & ☀️ Light Mode Toggle",
                    description: "Provides a seamless theme switch that updates the editor theme, preview background, and overall UI to suit different lighting preferences."
                },
                {
                    title: "📐 Responsive Split-View Layout",
                    description: "Uses a flexible split layout to display the editor and preview side by side on larger screens and stacked on smaller devices."
                },
                {
                    title: "🧭 Scrollable Preview Container",
                    description: "Implements a fixed-height preview viewport with scrolling support, ensuring large HTML layouts remain usable without breaking the editor layout."
                }
            ],
            challenges: [
                {
                    title: "🧠 Enabling Autosuggestions in Ace Editor",
                    description: "Ace Editor does not enable autosuggestions by default. Required explicit integration of language tools, snippet modules, and editor configuration to activate live autocompletion."
                },
                {
                    title: "📏 Managing Preview Height Constraints",
                    description: "The live preview needed to be constrained within a fixed viewport to maintain layout consistency. Designing a scrollable preview ensured usability without dynamic iframe resizing."
                },
                {
                    title: "🎨 Synchronizing Theme Across Editor & Preview",
                    description: "Switching between dark and light modes required coordinating Ace editor themes, document background colors, and preview styling without visual flicker."
                },
                {
                    title: "⚙️ Safe DOM Rendering",
                    description: "Injecting user-written HTML into the preview required controlled rendering logic to avoid layout instability and ensure predictable behavior."
                }
            ],
            outcome: "The Online HTML Editor successfully delivers a polished, developer-oriented coding environment within the browser. With features like autosuggestions, syntax highlighting, live preview rendering, and theme toggling, it closely mirrors the feel of lightweight online IDEs. The project demonstrates practical experience in integrating third-party editor libraries, managing real-time UI updates, and designing stable, responsive developer tools. It serves as a strong example of building interactive, tool-based applications rather than simple demo projects."
        },
        {
            title: 'Link to QR Code Generator',
            image: linkToQrCode,
            tools: ['React', 'react-qr-code'],
            description: 'Generates QR code for links using React and `react-qr-code`.',
            githubLink: "https://github.com/YashodharChavan/Link-to-QR-code",
            websiteLink: "https://link-to-qr-code-zeta.vercel.app",
            overview: "A fast and minimal QR code generator built using React and the react-qr-code library. Users can input any link and instantly receive a scannable QR code, which can also be downloaded as an image. Designed with simplicity and responsiveness in mind, the app is ideal for quick link sharing across devices.",
            features: [
                {
                    title: "🔗 Real-time Link-to-QR Conversion",
                    description: "Converts any valid URL into a QR code instantly as you type, without needing to press a button."
                },
                {
                    title: "📥 Downloadable QR Codes",
                    description: "Users can download the generated QR code as a PNG image for offline use or sharing."
                },
                {
                    title: "⚡ Built with React & react-qr-code",
                    description: "Leverages the lightweight `react-qr-code` package for fast, responsive QR rendering."
                },
                {
                    title: "📱 Mobile-Friendly Design",
                    description: "Fully responsive layout ensures it works seamlessly on mobile, tablet, and desktop devices."
                },
                {
                    title: "🎯 Minimal UI",
                    description: "Focused, clutter-free interface built for maximum usability and quick access."
                }
            ],
            challenges: [
                {
                    title: "🔍 Input Validation",
                    description: "Ensuring that users only entered valid URLs was essential to avoid generating broken or unscannable QR codes. Implemented regex-based validation with real-time feedback to guide users."
                },
                {
                    title: "📥 Enabling QR Code Download",
                    description: "Allowing users to download the generated QR as a PNG required rendering the SVG QR into a canvas and converting it into an image, which introduced cross-browser compatibility considerations."
                },
                {
                    title: "📱 Ensuring Mobile Responsiveness",
                    description: "Designing a clean and responsive layout that works well across all screen sizes required careful use of media queries and layout utilities in Tailwind CSS."
                },
                {
                    title: "⚙️ Customizing QR Appearance",
                    description: "The `react-qr-code` package had limited styling options out of the box. Had to explore SVG manipulation and layering techniques to achieve a minimal yet polished look."
                },
                {
                    title: "⏱️ Real-Time Updates without Performance Drop",
                    description: "Rendering a new QR code on every keystroke needed to be smooth. Optimized input debouncing and component re-renders to maintain snappy performance."
                }
            ],
            outcome: "The Link to QR Code Generator successfully delivers a seamless and efficient way to transform URLs into scannable QR codes in real time. With features like instant preview, download as PNG, and a fully responsive layout, the app stands out as a lightweight tool for quick link sharing across devices. Through thoughtful optimizations in validation, rendering, and styling, the project demonstrates how React and third-party libraries can be leveraged to build fast, user-friendly utilities. It’s practical for both personal and professional use, especially in situations where fast, offline-compatible QR code generation is needed."
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
                            <h1 className="text-4xl font-bold text-center" ref={projectsRef}>
                                My Projects
                            </h1>
                            <p className="w-full text-center text-base font-medium">
                                I believe true learning happens through building. Every time I explore something new, my imagination sparks ideas—and I bring them to life through projects.
                            </p>
                            <div className="m-auto px-4 sm:px-6 select-none py-2 sm:py-3 rounded-2xl w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300" onClick={handleScrollToProjects}>
                                <p className="text-sm sm:text-base" style={{ padding: "4px 12px" }}>Explore</p>
                            </div>
                            <div className="absolute bg-[#8493FF] h-4 w-4 right-[20%] top-[20%] blur-lg glow-one"></div>
                            <img loading='lazy' src={art9} alt="" draggable="false" className="h-24 select-none w-fit absolute top-[70%] right-[5%] float-animation-slow" />
                            <img loading='lazy' src={art10} alt="" draggable="false" className="h-24 select-none w-fit absolute top-[10%] left-[5%] float-animation" />
                        </div>
                    </div>

                    {/* Grid */}
                    <hr className="gradient-hr" />
                    <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-rose-500" style={{ padding: "24px 0px" }} ref={projectsRef}>
                        My Projects:
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
                                    <img loading='lazy' src={project.image} className="h-fit w-full" />

                                    <h1 className="font-medium text-xl  text-center">{project.title}</h1>
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
                    <div className="flex items-center justify-between gap-x-3 mb-4">

                        {/* Left: Back Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="border border-[#7F8A9A] w-14 h-7 rounded-3xl cursor-pointer flex justify-center items-center"
                            style={{
                                background: "linear-gradient(to bottom, #C5CDD9 0%, #AAB5C7 50%, #BFC7D5 100%)"
                            }}
                        >
                            <img loading="lazy" src={back} alt="Back" className="h-4/5" />
                        </button>

                        {/* Right: Links */}
                        <div className="flex items-center gap-x-2">

                            {/* GitHub Link */}
                            {selectedProject.githubLink && (
                                <a
                                    href={selectedProject.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-x-1.5 border border-[#565656] bg-[#e1e1e1] rounded-full text-sm hover:scale-105 transition"
                                    style={{ padding: "4px 8px" }}
                                >
                                    <img src={github} className="h-4 w-4" />
                                    <span style={{ fontFamily: 'outfit' }}>Code</span>
                                </a>
                            )}

                            {/* Website Link */}
                            {selectedProject.websiteLink && (
                                <a
                                    href={selectedProject.websiteLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-x-1.5 border border-[#565656] bg-[#e1e1e1] rounded-full text-sm hover:scale-105 transition"
                                    style={{ padding: "4px 8px" }}
                                >
                                    <img src={website} className="h-4 w-4" />
                                    <span style={{ fontFamily: 'outfit' }}>Visit</span>
                                </a>
                            )}

                        </div>
                    </div>


                    <div className="flex items-center justify-between gap-x-4">
                        <h1
                            className="text-3xl font-bold mb-4"
                            style={{ fontFamily: 'outfit' }}
                            title={selectedProject.title}
                        >
                            {selectedProject.title}
                        </h1>

                    </div>

                    <p className='text-lg'>{selectedProject.description}</p>
                    <img loading='lazy' src={selectedProject.image} className="w-full max-w-3xl rounded-lg" />
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool, i) => (
                            <div key={i} className="border-2 rounded-full" style={{ padding: "2px 6px", borderColor: "#9999ff", fontFamily: 'outfit' }}>{tool}</div>
                        ))}
                    </div>
                    <ProjectDetails
                        overview={selectedProject.overview}
                        features={selectedProject.features}
                        challenges={selectedProject.challenges}
                        outcome={selectedProject.outcome}
                        teamwork={selectedProject.teamwork || null}
                    />
                </div>
            )}
        </>
    );
};

export default React.memo(Projects);
