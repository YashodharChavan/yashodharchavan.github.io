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
                        className="h-24 select-none w-fit absolute top-[10%] left-[5%] float-animation-slow"
                    />
                </div>
            </div>

            <hr className="gradient-hr"/>
            <table>
                
            </table>
        </div >
    )
}

export default Projects