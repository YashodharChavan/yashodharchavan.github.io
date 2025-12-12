import React, { useState, useEffect } from 'react';
import SimpleFrame from './SimpleFrame';
import DefaultDictionaryWindow from './DefaultDictionaryWindow';
import TranslationDefination from './TranslationDefination'
import './component.css';
const Dictionary = () => {
    const [searchString, setSearchString] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedWord, setSelectedWord] = useState(null);
    const [totalEntriesFound, setTotalEntriesFound] = useState(0)
    const [externalFontSize, setExternalFontSize]   = useState(0)
    // Fetch suggestions when user types
    useEffect(() => {
        if (searchString.trim() === '') {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            const res = await fetch(`https://api.datamuse.com/sug?s=${searchString}&max=20`);
            const data = await res.json();
            setSuggestions(data.map(d => d.word));
            setTotalEntriesFound(data.length)
        };

        fetchSuggestions();
    }, [searchString]);

    const handleSearchChange = (value) => {
        setSearchString(value);
        setSelectedWord(null); // reset selected word when new typing happens
    };

    const handleSuggestionClick = (word) => {
        setSelectedWord(word);
    };

    const decrementFontSize = () => {
        if(externalFontSize < -6) return
        setExternalFontSize(externalFontSize-1)
    }
    
    const incrementFontSize = () => {
        if(externalFontSize > 6) return
        setExternalFontSize(externalFontSize+1)

    }

    return (
        <SimpleFrame
            id="dictionary"
            name="Dictionary"
            icon="dictionary"
            title="Dictionary and Thesaurus"
            height="400"
            width="600"
            minHeight="350"
            minWidth="430"
            showDimensions={false}
            optionalBackground={null}
            hasDrawer={false}
            isResizable={true}
            hasPadding={false}
        >
            {/* Header */}
            <div className="operation-buttons flex w-full h-fit items-center justify-between" style={{ padding: "6px", backgroundImage: "linear-gradient(rgb(204, 204, 204), rgb(231, 231, 231))" }}>
                <div className="font-operation flex w-1/2 gap-x-2 h-full">
                    <div className="buttons w-fit h-full outline outline-[#666666] rounded-sm"
                        style={{ background: "linear-gradient(to bottom, #f2f2f2 0%, #d9d9d9 100%)" }}>
                        <button className='h-full text-sm w-9 bg-transparent' onClick={decrementFontSize}>A</button>
                        <button className='h-full w-9 bg-transparent border-l border-[#666666]' onClick={incrementFontSize}>A</button>
                    </div>
                </div>
                <div className="search-operation flex justify-end w-1/2 h-full">
                    <input
                        type="text"
                        placeholder="search"
                        className="bg-white outline rounded-2xl"
                        style={{ padding: "0px 8px", boxShadow: "inset 1px 1px 3px 0px #C7C7C7" }}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content overflow-y-auto" style={{ height: "calc(100% - 36px)" }}>
                {!searchString.trim() && <DefaultDictionaryWindow />}
                {searchString.trim() && !selectedWord && (
                    <>
                        <p>{totalEntriesFound} entries found for "{searchString}"</p>
                        <ul className="ml-4">
                            {suggestions.map((word, idx) => (
                                <li key={idx} className="cursor-pointer hover:bg-[#D4D4D4]" style={{ padding: "0px 8px", fontSize: `calc(16px + ${externalFontSize}px)` }} onClick={() => handleSuggestionClick(word)}>
                                    {word}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {selectedWord && <TranslationDefination word={selectedWord} onBack={() => setSelectedWord(null)} fontSize={externalFontSize} />}
            </div>
        </SimpleFrame>
    );
};

export default React.memo(Dictionary);
