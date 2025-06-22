import React, { useEffect } from 'react';
import './component.css';
import TypeIt from 'typeit-react';
import email from '../assets/icons/email.svg'
import linkedin from '../assets/icons/linkedin.svg'
import github from '../assets/icons/github.svg'
import art1 from '../assets/icons/art1.png'
import art2 from '../assets/icons/art2.png'
import art3 from '../assets/icons/art3.png'

const About = () => {

    return (
        <div className="min-h-screen w-full bg-[#ECF2F9]">
            <div className="topbar font-bold text-lg sm:text-xl" style={{ padding: "12px 24px" }}>Yashodhar</div>
            <hr className="gradient-hr" />

            <div className="landing-container w-full relative bg-[#ECF2F9] background-inset" style={{ padding: "64px 24px" }}>
                <div className="introduction m-auto w-full h-full py-8 sm:py-16 flex flex-col items-center justify-center gap-4 sm:gap-6">
                    <h1
                        className="text-3xl font-bold bg-gradient-to-r from-[#582700] via-[#6A4994] via-[#424CA0] via-[#7FBAE4] to-[#171717] bg-clip-text text-transparent text-center"
                        id="typing"
                    >
                        <TypeIt
                            options={{
                                strings: ["A Curious", "An Extra", "Tech Explorer", "A Student", "A React Enthusiast"],
                                speed: 100,
                                deleteSpeed: 50,
                                breakLines: false,
                                loop: true,
                                waitUntilVisible: true,
                            }}
                        />
                    </h1>
                    <h1 className="text-4xl font-bold bg-black bg-clip-text text-transparent text-center">
                        I am Yashodhar Chavan
                    </h1>
                    <p className="w-full text-center text-base font-medium ">
                        Hi, 👋 I'm Yashodhar Chavan! I'm passionate about new technologies and always eager to learn. Lately, I've been diving deep into React.js with a lot of curiosity.
                    </p>
                    <div className="m-auto px-4 sm:px-6 select-none py-2 sm:py-3 rounded-2xl w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300">
                        <p className="text-sm sm:text-base" style={{ padding: "4px 12px" }}>Explore</p>
                    </div>
                </div>
                <div className="absolute bg-red-500 h-4 w-4 right-[20%] top-[20%] blur-lg red-glow"></div>
                <img
                    src={art2}
                    alt=""
                    draggable="false"
                    className="h-20 select-none w-fit absolute top-[10%] left-[5%] float-animation"
                />
                <img
                    src={art3}
                    alt=""
                    draggable="false"
                    className=" h-20 select-none w-fit absolute top-[70%] right-[5%] float-animation-slow"
                />
            </div>
            <div className="hidden lg:block absolute bg-red-500 h-4 w-4 bottom-[30%] left-[30%] rounded-full blur-lg red-glow"></div>
            <hr className="gradient-hr" />

            <div className="journey bg-[#ECF2F9] relative w-full px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-red-500" style={{ padding: "24px 0px" }}>
                    My Journey
                </h1>
                <div className="outer-container h-full w-full" style={{ padding: "12px" }}>
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-[95%]  relative journey-container rounded bg-white " style={{ margin: "4px 0px", margin: "4px 0px 8px auto", padding: "6px" }}>

                            <h1
                                className="text-2xl font-bold bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: "url('https://ik.imagekit.io/sheryians/three.js/mask_5gcMWG8mG.jpg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'bottom center',
                                }}
                            >
                                HTML, CSS, C and Linux
                            </h1>
                            <p className="font-medium text-sm sm:text-base lg:text-lg">
                                These technologies were part of my 2nd semester, where I built a strong foundation in web development and system programming.
                            </p>
                            <div className="bump absolute w-4 h-4 rotate-45 bg-white top-[10%] border-l border-l-black border-b border-b-black left-[-9px]"></div>
                        </div>
                    </div>
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-[95%]  relative journey-container rounded bg-white" style={{ margin: "4px 0px", margin: "4px 0px 8px auto", padding: "6px" }}>
                            <h1
                                className="text-2xl font-bold bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1484589065579-248aad0d8b13?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'right center',
                                }}
                            >
                                DSA using C, DBMS, and C++
                            </h1>
                            <p className="font-medium text-sm sm:text-base lg:text-lg">
                                In the 3rd semester, I explored data structures using C, mastered database fundamentals with DBMS, and began object-oriented programming with C++.
                            </p>
                            <div className="bump absolute w-4 h-4 rotate-45 bg-white top-[10%] border-l border-l-black border-b border-b-black left-[-9px]"></div>
                        </div>
                    </div>
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-[95%]  relative journey-container rounded bg-white" style={{ margin: "4px 0px", margin: "4px 0px 8px auto", padding: "6px" }}>
                            <h1
                                className="text-2xl font-bold bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1710270578658-847a60efb10c?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'right center',
                                }}
                            >
                                JavaScript, ReactJS, Express, MongoDB
                            </h1>
                            <p className="font-medium text-sm sm:text-base lg:text-lg">
                                I explored modern web development during the 3rd semester break, learning JavaScript, ReactJS, Express, and MongoDB on my own.
                            </p>
                            <div className="bump absolute w-4 h-4 rotate-45 bg-white top-[10%] border-l border-l-black border-b border-b-black left-[-9px]"></div>
                        </div>
                    </div>
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-[95%]  relative journey-container rounded bg-white" style={{ margin: "4px 0px", margin: "4px 0px 8px auto", padding: "6px" }}>
                            <h1
                                className="text-2xl font-bold bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1711560026656-814d5a9e980f?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'right center',
                                }}
                            >
                                Java, Python and UI/UX Design
                            </h1>
                            <p className="font-medium text-sm sm:text-base lg:text-lg">
                                Introduced in my 4th semester, this course focused on Java, Python, and UI/UX design principles.
                            </p>
                            <div className="bump absolute w-4 h-4 rotate-45 bg-white top-[10%] border-l border-l-black border-b border-b-black left-[-9px]"></div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="gradient-hr" />

            <div className="contact-me-page w-full bg-[#ECF2F9] relative contact-background-inset" style={{ padding: "24px" }}>

                <h1 className="text-3xl font-bold text-center underline decoration-wavy decoration-red-500" style={{ padding: "12px 0px" }}>
                    Contact Me
                </h1>
                <div className="contact-list w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" style={{ padding: "18px" }}>
                    <div className="github flex items-center flex-col gap-y-3 text-center">
                        <p className="text-2xl font-bold">Github</p>
                        <p className="text-md font-bold text-gray-500">yashodharchavan</p>
                        <a
                            className="flex items-center gap-x-2 select-none rounded-full w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300"
                            style={{ padding: "4px 8px" }}
                            href="https://www.github.com/yashodharchavan"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={github} alt="" className="w-4 h-4" />
                            <p>Visit</p>
                        </a>
                    </div>
                    <div className="linkedin flex items-center flex-col gap-y-3 text-center">
                        <p className="text-2xl font-bold">LinkedIn</p>
                        <p className="text-md font-bold text-gray-500">Yashodhar Chavan</p>
                        <a
                            className="flex items-center gap-x-2 select-none rounded-full w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300"
                            style={{ padding: "4px 8px" }}
                            href="https://www.linkedin.com/in/yashodhar-chavan"
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                            <img src={linkedin} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                            <p>Visit</p>
                        </a>
                    </div>
                    <div className="email flex items-center flex-col gap-y-3 text-center">
                        <p className="text-2xl font-bold">Mail</p>
                        <p className="text-md font-bold text-gray-500 break-words">yashodhar2907@gmail.com</p>
                        <a
                            className="flex items-center gap-x-2 select-none rounded-full w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300"
                            style={{ padding: "4px 8px" }}
                            href="https://mail.google.com/mail/?view=cm&to=yashodhar2907@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={email} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                            <p>Mail me</p>
                        </a>
                    </div>
                </div>
                <div className="bg-[#9244AB] h-4 w-4 rounded-full blur-md top-[30%] right-[30%] purple-glow absolute"></div>
                <img
                    src={art1}
                    alt=""
                    className="h-14 w-fit absolute top-[10%] left-[15%] float-animation"
                />
            </div>
            <div className="bg-[#1d1d1d] h-12 w-full flex items-center">
                <p className="text-center text-white" style={{ margin: "auto" }}>Made with ❤️ from Yashodhar</p>
            </div>
        </div>
    );
};

export default About;