import React from 'react'
import art6 from '../assets/icons/art6.png'
import art7 from '../assets/icons/art7.png'


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


const Skills = () => {
    return (
        <>
            <div className="topbar font-bold text-lg sm:text-xl" style={{ padding: "12px 24px" }}>Yashodhar</div>
            <hr className="gradient-hr" />
            <div className="landing-container w-full relative bg-[#ECF2F9] background-inset" style={{ padding: "64px 24px" }}>
                <div className="introduction m-auto w-full h-full py-8 sm:py-16 flex flex-col items-center justify-center gap-4 sm:gap-6">
                    <h1 className="text-4xl font-bold text-center">
                        My SkillSet 🚀
                    </h1>
                    <p className="w-full text-center text-base font-medium">
                        From HTML and CSS to React, Java, and Python — my skills are diverse and growing. I believe in adapting quickly and learning new tools as projects demand⚡
                    </p>

                    <div className="m-auto px-4 sm:px-6 select-none py-2 sm:py-3 rounded-2xl w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300">
                        <p className="text-sm sm:text-base" style={{ padding: "4px 12px" }}>Explore</p>
                    </div>
                </div>
                <div className="absolute bg-[#8493FF] h-4 w-4 right-[20%] top-[20%] blur-lg glow-one"></div>
                <img
                    src={art6}
                    alt=""
                    draggable="false"
                    className="h-24 select-none w-fit absolute top-[10%] left-[5%] float-animation"
                />
                <img
                    src={art7}
                    alt=""
                    draggable="false"
                    className=" h-28 select-none w-fit absolute top-[70%] right-[5%] float-animation-slow"
                />
            </div>
            <hr className="gradient-hr" />

            <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-red-500" style={{ padding: "24px 0px" }}>
                My Skills:
            </h1>

            <table className="w-[90%] relative" style={{ "margin": "0px auto 32px auto" }}>
                {/* <img
                    src={art5}
                    alt=""
                    draggable="false"
                    className="h-20 select-none w-fit absolute top-[-14%] right-[4%] float-animation-slow"
                /> */}
                <thead>
                    <tr className="bg-[#f3f4f6]">
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Sr No</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Skill</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Proficiency (%)</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Experience Level</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Notes</th>
                    </tr>
                </thead>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>1</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>React JS</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={60} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Novice</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}> Gained familiarity with basic syntax and built a few small projects; still building confidence.</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>2</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>HTML</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={90} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Intermediate</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}> Have a solid understanding of the concepts and structure. Built a few projects earlier using pure HTML.</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>3</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>CSS</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={65} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Intermediate</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Comfortable with commonly used properties. I can build responsive sites, though I refer to documentation for advanced styling needs.</td>
                </tr>

                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>4</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>JavaScript</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={65} /></td>

                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Novice</td>
                    <td className="border border-gray-300" style={{ padding: '8px 16px' }}>
                        Familiar with core concepts. Confident in managing request-response models and comfortable with asynchronous programming. still building confidence for advanced logic.
                    </td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>5</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Java</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}><CompletionBar percentage={70} /></td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Intermediate</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}> Confident with core Java concepts and familiar with AWT and Swing. Built several advanced projects, including a photo enhancer application.</td>
                </tr>
                <tr className="bg-white">
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>6</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Python</td>
                    <td className="border border-gray-300" style={{ padding: "8px 16px" }}>Novice</td>
                    <td className="border border-gray-300" style={{ padding: '8px 16px' }}>
                        I have a solid understanding of Python and have explored advanced libraries like NumPy, Pandas, Matplotlib, Plotly, and TensorFlow. While I'm not deeply specialized, I can confidently work with these tools and adapt as needed.
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

        </>
    )
}

export default Skills