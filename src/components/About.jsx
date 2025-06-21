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
            <div className="topbar font-bold text-lg sm:text-xl" style={{padding: "12px 24px"}}>Yashodhar</div>
            <hr className="gradient-hr" />

            <div className="landing-container w-full relative bg-[#ECF2F9] background-inset" style={{padding: "64px 24px"}}>
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
                        <p className="text-sm sm:text-base">Explore</p>
                    </div>
                </div>
                <div className="hidden lg:block absolute bg-red-500 h-4 w-4 right-[20%] top-[20%] blur-lg red-glow"></div>
                <img
                    src={art2}
                    alt=""
                    draggable="false"
                    className="hidden lg:block h-20 xl:h-28 select-none w-fit absolute top-[10%] left-[5%] float-animation"
                />
                <img
                    src={art3}
                    alt=""
                    draggable="false"
                    className="hidden lg:block h-20 xl:h-28 select-none w-fit absolute top-1/2 right-[5%] float-animation-slow"
                />
            </div>
            <div className="hidden lg:block absolute bg-red-500 h-4 w-4 bottom-[30%] left-[30%] rounded-full blur-lg red-glow"></div>
            <hr className="gradient-hr" />

            <div className="journey bg-[#ECF2F9] relative w-full px-4 sm:px-6 py-8 sm:py-12">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-red-500">
                    My Journey
                </h1>
                <div className="outer-container w-full sm:w-11/12 lg:w-4/5 m-auto py-2 h-full">
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-full sm:w-4/5 lg:w-[48%] relative p-3 sm:p-4 journey-container my-2 rounded bg-white mx-auto lg:mx-0">
                            <h1
                                className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent"
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
                        </div>
                    </div>
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-full sm:w-4/5 lg:w-[47.5%] relative p-3 sm:p-4 journey-container my-2 lg:ml-auto h-fit rounded bg-white mx-auto lg:mx-0">
                            <h1
                                className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent"
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
                        </div>
                    </div>
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-full sm:w-4/5 lg:w-[48%] relative p-3 sm:p-4 journey-container my-2 rounded bg-white mx-auto lg:mx-0">
                            <h1
                                className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent"
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
                        </div>
                    </div>
                    <div className="journeybox p-2 relative w-full">
                        <div className="border border-black gap-y-3 sm:gap-y-4 flex flex-col justify-evenly w-full sm:w-4/5 lg:w-[47.5%] relative p-3 sm:p-4 journey-container my-2 lg:ml-auto h-fit rounded bg-white mx-auto lg:mx-0">
                            <h1
                                className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent"
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
                        </div>
                    </div>
                </div>
            </div>
            <hr className="gradient-hr" />

            <div className="contact-me-page w-full bg-[#ECF2F9] px-4 sm:px-6 py-8 sm:py-12 relative contact-background-inset">

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-red-500">
                    Contact Me
                </h1>
                <div className="contact-list w-full h-fit grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-8 lg:px-11 py-6 sm:py-9">
                    <div className="github flex justify-center flex-col gap-y-3 sm:gap-y-4 text-center">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">Github</p>
                        <p className="text-lg sm:text-xl font-bold text-gray-500">yashodharchavan</p>
                        <button className="flex items-center gap-x-2 text-sm sm:text-base lg:text-lg m-auto px-3 sm:px-4 select-none py-1 sm:py-2 rounded-full w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300">
                            <img src={github} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                            <p>Visit my Github</p>
                        </button>
                    </div>
                    <div className="linkedin flex justify-center flex-col gap-y-3 sm:gap-y-4 text-center">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">LinkedIn</p>
                        <p className="text-lg sm:text-xl font-bold text-gray-500">Yashodhar Chavan</p>
                        <button className="flex items-center gap-x-2 text-sm sm:text-base lg:text-lg m-auto px-3 sm:px-4 select-none py-1 sm:py-2 rounded-full w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300">
                            <img src={linkedin} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                            <p>Visit my LinkedIn</p>
                        </button>
                    </div>
                    <div className="email flex justify-center flex-col gap-y-3 sm:gap-y-4 text-center">
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">Mail</p>
                        <p className="text-lg sm:text-xl font-bold text-gray-500 break-words">yashodhar2907@gmail.com</p>
                        <button className="flex items-center gap-x-2 text-sm sm:text-base lg:text-lg m-auto px-3 sm:px-4 select-none py-1 sm:py-2 rounded-full w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300">
                            <img src={email} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
                            <p>Mail me</p>
                        </button>
                    </div>
                </div>
                <div className="hidden lg:block bg-[#9244AB] h-4 w-4 rounded-full blur-md top-[30%] right-[30%] purple-glow absolute"></div>
                <img
                    src={art1}
                    alt=""
                    className="hidden lg:block h-20 xl:h-28 w-fit absolute top-[10%] left-[20%] float-animation"
                />
            </div>
        </div>
    );
};

export default About;