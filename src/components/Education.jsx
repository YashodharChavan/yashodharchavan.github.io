import education from '../assets/icons/education.avif'
import art4 from '../assets/icons/art4.avif'
import art5 from '../assets/icons/art5.avif'
import genericDocument from '../assets/folders/GenericDocumentIcon.avif'
import redirect from '../assets/icons/redirect.svg'

import React, { useRef } from 'react';

const RedirectComponent = ({ name, url }) => {

    return (
        <a
            className='bg-white hover:bg-[#A2B2CA] w-[90%] h-4/5 rounded-2xl flex justify-between items-center'
            href={url}
            style={{ padding: "4px 12px" }}
            target='_blank'
        >
            <div className="flex gap-x-1 items-center">
                <img src={genericDocument} alt="" className='h-7 w-fit' />
                <p className="text-sm">{name}</p>
            </div>

            <img src={redirect} alt="" />
        </a>
    )
}

const CompletionBar = ({ percentage }) => {
    return (
        <div className="w-4/5 h-4 rounded bg-gray-300 overflow-hidden shadow-inner">
            <div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};


const Education = () => {
    const academicsRef = useRef(null);

    const handleScrollToAcademics = () => {
        academicsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="min-h-screen w-full bg-[#ECF2F9]">
            <div className="topbar font-bold text-lg sm:text-xl" style={{ padding: "12px 24px" }}>Yashodhar</div>
            <hr className="gradient-hr" />
            <div className="landing-container w-full relative bg-[#ECF2F9] background-inset" style={{ padding: "64px 24px" }}>
                <div className="introduction m-auto w-full h-full py-8 sm:py-16 flex flex-col items-center justify-center gap-4 sm:gap-6">
                    <h1 className="text-4xl font-bold text-center">
                        I ❤️ Education
                    </h1>
                    <p className="w-full text-center text-base font-medium ">
                        I always love to learn. Learning is the only difference between today and tomarrow 😇
                    </p>
                    <div className="m-auto px-4 sm:px-6 select-none py-2 sm:py-3 rounded-2xl w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300" onClick={handleScrollToAcademics}>
                        <p className="text-sm sm:text-base" style={{ padding: "4px 12px" }}>Explore</p>
                    </div>
                </div>
                <div className="absolute bg-[#8493FF] h-4 w-4 right-[20%] top-[20%] blur-lg glow-one"></div>
                <img
                    src={art4}
                    alt=""
                    draggable="false"
                    className="h-28 select-none w-fit absolute top-[10%] left-[5%] float-animation"
                />
                <img
                    src={education}
                    alt=""
                    draggable="false"
                    className=" h-20 select-none w-fit absolute top-[70%] right-[5%] float-animation-slow"
                />
            </div>
            <hr className="gradient-hr" />

            <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-red-500" style={{ padding: "24px 0px" }} ref={academicsRef}>
                My Academics:
            </h1>

            <table className="w-[90%]" style={{ "margin": "0px auto 32px auto" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f3f4f6" }}>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Year</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Grade</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Total Percentage</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Result PDF</th>
                    </tr>
                </thead>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>2020</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>10th</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>95%</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>
                        <RedirectComponent name="10th Result" url="https://google.com" />
                    </td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>year</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>1st Semester</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>87%</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><RedirectComponent name="1st Semester Result" url="https://drive.google.com/file/d/1Z9Tt6XHf4Hk6Kd2rTt1t2t2t2t2t2t2t/view?usp=sharing" /></td>
                </tr>

                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>year</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>2nd semester</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>88%</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><RedirectComponent name="2nd Semester Result" url="https://drive.google.com/file/d/1Z9Tt6XHf4Hk6Kd2rTt1t2t2t2t2t2t2t/view?usp=sharing" /></td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>year</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>3rd semester</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>89.89%</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><RedirectComponent name="3rd Semester Result" url="https://drive.google.com/file/d/1Z9Tt6XHf4Hk6Kd2rTt1t2t2t2t2t2t2t/view?usp=sharing" /></td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>year</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>4th semester</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>91.65%</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><RedirectComponent name="4th Semester Result" url="https://drive.google.com/file/d/1Z9Tt6XHf4Hk6Kd2rTt1t2t2t2t2t2t2t/view?usp=sharing" /></td>
                </tr>
            </table>
            <hr className="gradient-hr" />

            <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-purple-600" style={{ padding: "24px 0px" }}>
                My Favourite Books:
            </h1>

            <table className="w-[90%] relative" style={{ "margin": "0px auto 32px auto" }}>
                <img
                    src={art5}
                    alt=""
                    draggable="false"
                    className="h-20 select-none w-fit absolute top-[-14%] right-[4%] float-animation-slow"
                />
                <thead>
                    <tr className="bg-[#f3f4f6]">
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Sr No</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Book Title</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Author</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Completion</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Repetition</th>
                    </tr>
                </thead>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>1</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Think and Grow Rich</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Napoleon Hill</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={60} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>2</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>2</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>The Autobiography of a Yogi</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Paramhansa Yogananda</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={5} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>0</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>3</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Mindset</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Carol Dweck</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={60} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>2</td>
                </tr>

                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>4</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>As a Man Thinketh</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>James Allen</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={80} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>0</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>5</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>The Man's Search for Meaning</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Viktor Frankl</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>
                        <CompletionBar percentage={60} />
                    </td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>0</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>6</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Do Epic Shit</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Ankur Warikoo</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>
                        <CompletionBar percentage={100} />
                    </td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>3</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>7</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Atomic Habits</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>James Clear</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>
                        <CompletionBar percentage={100} />
                    </td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>2</td>
                </tr>
            </table>



        </div>

    )
}

export default Education