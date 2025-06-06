import React, { useState } from 'react'
import SimpleFrame from './SimpleFrame'
import './component.css'
import downArrow from '../assets/downArrow.svg'
import leftAlignment from '../assets/leftAlignment.svg'
import rightAlignment from '../assets/rightAlignment.svg'
import spreadAlignment from '../assets/spreadAlignment.svg'
import centerAlignment from '../assets/centerAlignment.svg'

const TextEdit = () => {

    const [selectedStyleOption, setSelectedStyleOption] = useState('');
    const [selectedAlignmentOption, setSelectedAlignmentOption] = useState('left')
    const [selectedSpacingOption, setSelectedSpacingOption] = useState('single')
    const [text, setText] = useState('');
    return (
        <>
            <SimpleFrame
                title="Untitled"
                id='textedit'
                icon='textEdit'
                isResizable={true}
                height="400"
                width="600"
                minHeight="400"
                minWidth="600"
                optionalBackground={null}
            >
                <div className="edit-bar w-full h-14">
                    <div className="font-edit-bar flex items-center justify-between 4 h-1/2 bg-blue w-full" style={{ padding: "0px 12px" }}>
                        <div className="edit-options flex gap-x-2">
                            <div className="select-style-option flex items-center">

                                <select id="dropdownstyle" value={selectedStyleOption} onChange={(e) => setSelectedStyleOption(e.target.value)} aria-placeholder='' className="text-sm text-gray-900 bg-white border border-[#6c6c6c] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="" disabled hidden>styles</option>
                                    <option value="default">default</option>
                                    <option value="bold">bold</option>
                                    <option value="italic">italic</option>
                                    <option value="outlined">outlined</option>
                                    <option value="shadowed">shadowed</option>
                                </select>
                                <div className="select-arrow h-[25px] w-5 flex items-center justify-center">
                                    <img src={downArrow} alt="" className="h-[60%]" />
                                </div>
                            </div>

                            <div className="select-alignment-options flex h-6 w-36 rounded-md bg-white">
                                {selectedAlignmentOption == 'left' ? (
                                    <div className="left-alignment w-1/4 selected-alignment-option rounded-tl-md rounded-bl-md" onClick={() => setSelectedAlignmentOption('left')}>
                                        <img src={leftAlignment} alt="" className="h-[60%]" />
                                    </div>
                                ) : (
                                    <div className="left-alignment w-1/4 rounded-tl-md rounded-bl-md" onClick={() => setSelectedAlignmentOption('left')}>
                                        <img src={leftAlignment} alt="" className="h-[60%]" />
                                    </div>
                                )}
                                {selectedAlignmentOption == 'center' ? (
                                    <div className="center-alignment w-1/4 selected-alignment-option" onClick={() => setSelectedAlignmentOption('center')}>
                                        <img src={centerAlignment} alt="" className="h-[60%]" />
                                    </div>
                                ) : (
                                    <div className="center-alignment w-1/4" onClick={() => setSelectedAlignmentOption('center')}>
                                        <img src={centerAlignment} alt="" className="h-[60%]" />
                                    </div>
                                )}
                                {selectedAlignmentOption == 'spread' ? (
                                    <div className="spread-alignment w-1/4 selected-alignment-option" onClick={() => setSelectedAlignmentOption('spread')}>
                                        <img src={spreadAlignment} alt="" className="h-[60%]" />
                                    </div>
                                ) : (
                                    <div className="spread-alignment w-1/4" onClick={() => setSelectedAlignmentOption('spread')}>
                                        <img src={spreadAlignment} alt="" className="h-[60%]" />
                                    </div>
                                )}
                                {selectedAlignmentOption == 'right' ? (
                                    <div className="right-alignment w-1/4 selected-alignment-option rounded-tr-md rounded-br-md" onClick={() => setSelectedAlignmentOption('right')}>
                                        <img src={rightAlignment} alt="" className="h-[60%]" />
                                    </div>
                                ) : (
                                    // if selectedAlignmentOption is not right, then show the right alignment icon without selected class
                                    <div className="right-alignment w-1/4 rounded-tr-md rounded-br-md" onClick={() => setSelectedAlignmentOption('right')}>
                                        <img src={rightAlignment} alt="" className="h-[60%]" />
                                    </div>
                                )}
                            </div>

                            <div className="select-spacing-option flex items-center">

                                <select id="dropdownspacing" value={selectedSpacingOption} onChange={(e) => setSelectedSpacingOption(e.target.value)} aria-placeholder='' className="text-sm text-gray-900 bg-white border border-[#6c6c6c] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="" disabled hidden>spacing</option>
                                    <option value="single">single</option>
                                    <option value="double">double</option>
                                </select>
                                <div className="select-arrow h-[25px] w-5 flex items-center justify-center">
                                    <img src={downArrow} alt="" className="h-[60%]" />
                                </div>
                            </div>
                        </div>
                        <div className="right-option"></div>
                    </div>
                    <div className="calibration-bar"></div>
                </div>

            </SimpleFrame>

        </>


    )
}

export default TextEdit