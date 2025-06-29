import React from 'react'
import art9 from '../assets/icons/art9.png'
import art10 from '../assets/icons/art10.png'
import macOsXTiger from '../assets/projects/macOSXTiger.png'
import photoEnhancer from '../assets/projects/photoEnhancer.png'
import emailLess from '../assets/projects/emailLessCompose.png'
import folderVisualizer from '../assets/projects/folderVisualizer.png'
import linkToQrCode from '../assets/projects/linkToQrCode.png'
import onlineHTMLEditor from '../assets/projects/onlineHTMLEditor.png'
import oxygenWeather from '../assets/projects/oxygenWeather.png'
import webDrawer from '../assets/projects/webDrawer.png'
const Projects = () => {



    const imageList = [macOsXTiger, oxygenWeather, photoEnhancer, linkToQrCode, folderVisualizer, onlineHTMLEditor, emailLess, webDrawer]
    const titleList = [
        'macOS X Tiger Clone (React)',
        'Oxygen Weather App (React Native)',
        'Photo Enhancer (Java Swing)',
        'Link to QR Code Generator',
        'Folder Visualizer (Java Swing)',
        'Online HTML Editor (React)',
        'Email Composer with NodeMailer',
        'Web Drawing Tool (React)'
    ];
    const descriptionTools = [
        ['React', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'npm'],
        ['React Native', 'Tailwind CSS', 'Expo', 'JavaScript', 'Vite', 'npm'],
        ['Java', 'Java Swing', 'Desktop GUI'],
        ['React', 'react-qr-code', 'HTML', 'CSS', 'JavaScript', 'npm'],
        ['Java', 'Java Swing', 'Tree Visualization'],
        ['React', 'Tailwind CSS', 'ace-builds', 'Syntax Highlighter', 'HTML', 'Vite', 'npm'],
        ['React', 'Node.js', 'Express', 'NodeMailer', 'npm'],
        ['React', 'HTML5 Canvas', 'CSS', 'JavaScript']
    ];

    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        return `#${r}${g}${b}`
      }


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

            <div
                className="grid gap-6"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(256px, 1fr))",
                    padding: "0px 32px 32px 32px"
                }}
            >

                {imageList.map((image, index) => {
                    return <div className="card min-w-64 flex flex-col items-center rounded-md outline outline-gray-300 bg-white shadow-md gap-y-2.5" style={{ padding: "4px" }}>
                        <img src={image} className='h-fit w-full' />
                        <h1 className='font-medium text-xl'>{titleList[index]}</h1>
                        <div className='flex gap-x-1 flex-wrap'>
                            {descriptionTools[index].map((descriptions, indexJ) => {
                                let borderColor = generateRandomColor()
                                return <div className={`rounded-full w-fit`} style={{ padding: "0px 4px", margin: "2px", border: `2px solid ${borderColor}` }}>{descriptions}</div>
                            })}
                        </div>
                    </div>

                })}
            </div>

        </div >
    )
}

export default Projects