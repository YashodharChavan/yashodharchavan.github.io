import art6 from '../assets/icons/art6.avif'
import art7 from '../assets/icons/art7.avif'
import art8 from '../assets/icons/art8.avif'
import React, { useRef } from 'react';
import { skills, softSkills } from '../components/Utils/skillUtils'

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


const SkillRow = ({ id, skill, proficiency, level, notes }) => (
    <tr className="bg-white">
        <td className="border border-gray-300 p-2" style={{ padding: "8px 16px" }}>{id}</td>
        <td className="border border-gray-300 p-2" style={{ padding: "8px 16px" }}>{skill}</td>
        <td className="border border-gray-300 p-2" style={{ padding: "8px 16px" }}>
            <CompletionBar percentage={proficiency} />
        </td>
        <td className="border border-gray-300 p-2" style={{ padding: "8px 16px" }}>{level}</td>
        <td className="border border-gray-300 p-2" style={{ padding: "8px 16px" }}>{notes}</td>
    </tr>
);


const Skills = () => {


    const skillsRef = useRef(null);

    const handleScrollToSkills = () => {
        skillsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
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

                    <div className="m-auto px-4 sm:px-6 select-none py-2 sm:py-3 rounded-2xl w-fit text-white font-semibold cursor-pointer gradient-button transition-transform duration-300" onClick={handleScrollToSkills}>
                        <p className="text-sm sm:text-base" style={{ padding: "4px 12px" }}>Explore</p>
                    </div>
                </div>
                <div className="absolute bg-[#8493FF] h-4 w-4 right-[20%] top-[20%] blur-lg glow-one"></div>
                <img
                    loading='lazy'
                    src={art6}
                    alt=""
                    draggable="false"
                    className="h-24 select-none w-fit absolute top-[10%] left-[5%] float-animation"
                />
                <img
                    loading='lazy'
                    src={art7}
                    alt=""
                    draggable="false"
                    className=" h-28 select-none w-fit absolute top-[70%] right-[5%] float-animation-slow"
                />
            </div>
            <hr className="gradient-hr" />

            <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-rose-500" style={{ padding: "24px 0px" }} ref={skillsRef}>
                Technical Skills:
            </h1>

            <table className="w-[90%] relative" style={{ "margin": "0px auto 32px auto" }}>
                <thead>
                    <tr className="bg-[#f3f4f6]">
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Sr No</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Skill</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Proficiency (%)</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Experience Level</th>
                        <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map((skill, index) => (
                        <SkillRow key={index} {...skill} />
                    ))}
                </tbody>
            </table>
            <hr className="gradient-hr" />

            <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center underline decoration-wavy decoration-violet-600" style={{ padding: "24px 0px" }}>
                Soft Skills:
            </h1>
            <div className="h-fit w-fit relative">
                <img
                    loading='lazy'
                    src={art8}
                    alt=""
                    draggable="false"
                    className="h-28 select-none w-fit absolute top-[-4%] right-[5%] float-animation-slow z-10"
                />
                <table className="w-[90%] relative" style={{ "margin": "0px auto 32px auto" }}>
                    <thead>
                        <tr className="bg-[#f3f4f6]">
                            <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Sr No</th>
                            <th className="border border-gray-300" style={{ padding: "8px 16px" }}>Skill</th>
                            <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Proficiency (%)</th>
                            <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Experience Level</th>
                            <th className="border border-gray-300" style={{ padding: "8px 16px" }}>	Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {softSkills.map((softSkill, index) => (
                            <SkillRow key={index} {...softSkill} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default React.memo(Skills);