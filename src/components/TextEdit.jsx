import React, { useEffect, useState, useRef } from 'react'
import SimpleFrame from './SimpleFrame'
import './component.css'
import downArrow from '../assets/downArrow.svg'
import leftAlignment from '../assets/leftAlignment.svg'
import rightAlignment from '../assets/rightAlignment.svg'
import spreadAlignment from '../assets/spreadAlignment.svg'
import centerAlignment from '../assets/centerAlignment.svg'
import Ruler from './Ruler'
const TextEdit = () => {

    const [selectedStyleOption, setSelectedStyleOption] = useState('');
    const [selectedAlignmentOption, setSelectedAlignmentOption] = useState('left')
    const [selectedSpacingOption, setSelectedSpacingOption] = useState('single')
    const [text, setText] = useState('');
    const [textSelection, setTextSelection] = useState({});


    const textareaRef = useRef(null)

    useEffect(() => {
        textareaRef.current.style.textAlign = selectedAlignmentOption
    }, [selectedAlignmentOption])

    const handleTextSelection = () => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        setTextSelection({ start, end });
    };


    const applyStyleToSelection = (style) => {
        const textarea = textareaRef.current;
        const { start, end } = textSelection;
        const selectedText = text.substring(start, end);

        let styledText = selectedText;
        switch (style) {
            case 'bold':
                styledText = `**${selectedText}**`;
                break;
            case 'italic':
                styledText = `*${selectedText}*`;
                break;
            case 'outlined':
                styledText = `<outlined>${selectedText}</outlined>`;
                break;
            case 'shadowed':
                styledText = `<shadowed>${selectedText}</shadowed>`;
                break;
            default:
                break;
        }

        const newText = text.slice(0, start) + styledText + text.slice(end);
        setText(newText);

        // Reset cursor after updating
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start, start + styledText.length);
        }, 0);
    };




    const handleSelectedStyleOption = (e) => {
        setSelectedStyleOption(e)
        applyStyleToSelection(e)
    }

    const applyStyle = (style) => {
        document.execCommand(style); // 'bold', 'italic', etc.
    };


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
                <div className="edit-bar w-full h-full">
                    <div className="font-edit-bar flex items-center justify-between 4 h-7 bg-blue w-full" style={{ padding: "0px 12px" }}>
                        <div className="edit-options flex gap-x-2">
                            <div className="select-style-option flex items-center">

                                <select id="dropdownstyle" value={selectedStyleOption} onChange={(e) => { handleSelectedStyleOption(e.target.value); applyStyle(e.target.value) }} aria-placeholder='' className="text-sm text-gray-900 bg-white border border-[#6c6c6c] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
                    </div>
                    <div className="calibration-bar h-6 w-full flex-shrink-0 overflow-hidden">
                        <Ruler unit={50} step={10} />
                    </div>
                    <div className="text-content h-[85%] w-full">
                        <textarea
                            ref={textareaRef}
                            id="text-content-area"
                            className="text-content-area w-full h-full focus:outline-none outline-none bg-transparent p-4 resize-none"
                            placeholder="Type your text here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onSelect={handleTextSelection}
                        />

                    </div>
                </div>

            </SimpleFrame>

        </>


    )
}

export default TextEdit