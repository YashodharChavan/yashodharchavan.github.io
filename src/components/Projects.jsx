import React from 'react'
import art9 from '../assets/icons/art9.png'
import art10 from '../assets/icons/art10.png'

const Projects = () => {
    return (
        <div className="min-h-screen w-full bg-[#ECF2F9]">

            <div className="landing-container w-full relative bg-[#ECF2F9] background-inset" style={{ padding: "64px 24px" }}>
                <div className="introduction m-auto w-full h-full py-8 sm:py-16 flex flex-col items-center justify-center gap-4 sm:gap-6">
                    <h1 className="text-4xl font-bold text-center">
                        My Projects 🎉
                    </h1>
                    <p className="w-full text-center text-base font-medium ">
                        I believe true learning happens through building. Every time I explore something new, my imagination sparks ideas—and I bring them to life through projects. My macOS X Tiger clone is one such creation, born from curiosity and a vision to make ideas real.
                    </p>
                    <div className="m-auto px-4 sm:px-6 select-none py-2 sm:py-3 rounded-2xl w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300">
                        <p className="text-sm sm:text-base" style={{ padding: "4px 12px" }}>Explore</p>
                    </div>
                    <div className="absolute bg-[#8493FF] h-4 w-4 right-[20%] top-[20%] blur-lg glow-one"></div>
                    <img
                        src={art9}
                        alt=""
                        draggable="false"
                        className="h-24 select-none w-fit absolute top-[70%] right-[5%] float-animation-slow"
                    />
                    <img
                        src={art10}
                        alt=""
                        draggable="false"
                        className="h-24 select-none w-fit absolute top-[10%] left-[5%] float-animation"
                    />
                </div>
            </div>

            <hr className="gradient-hr" />
            <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-rose-500" style={{ padding: "24px 0px" }}>
                Technical Skills:
            </h1>

            {/* 
                The current flexbox layout causes cards to stick to the edges and not center properly on wrap.
                To fix this, use a grid layout that auto-fits cards and centers them responsively.
                The following container uses Tailwind's grid utilities for a responsive, centered card layout.
            */}
            <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 py-8 max-w-7xl mx-auto" 
            >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project One</h3>
                        <p className="text-gray-600 text-sm">A brief description of the first project and its key features.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Two</h3>
                        <p className="text-gray-600 text-sm">A brief description of the second project and its key features.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-orange-400 to-red-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Three</h3>
                        <p className="text-gray-600 text-sm">A brief description of the third project and its key features.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Four</h3>
                        <p className="text-gray-600 text-sm">A brief description of the fourth project and its key features.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-teal-400 to-cyan-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Five</h3>
                        <p className="text-gray-600 text-sm">A brief description of the fifth project and its key features.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-400 to-purple-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Six</h3>
                        <p className="text-gray-600 text-sm">A brief description of the sixth project and its key features.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Seven</h3>
                        <p className="text-gray-600 text-sm">A brief description of the seventh project and its key features.</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-pink-400 to-rose-500"></div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Eight</h3>
                        <p className="text-gray-600 text-sm">A brief description of the eighth project and its key features.</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Projects