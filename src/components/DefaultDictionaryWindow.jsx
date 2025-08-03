import React from 'react'
import './component.css'
const DefaultDictionaryWindow = () => {
  return (
    <div className="default-window flex flex-col items-center gap-y-6 justify-around bg-red h-full text-[#666666]" style={{padding: "16px", textAlign: 'center'}}>
        <h2 className="text-xl" style={{fontFamily: "times now roman"}}>Type a word to look up in the dictionary and thesaurus...</h2>
        
        <div className="oxford-logo text-3xl color-[#DADADA]" style={{fontFamily: "Baskervville"}}>
            <p>OXFORD</p>
            <p>AMERICAN</p>
            <p>DICTIONARIES</p>
        </div>
    </div>
  )

}

export default React.memo(DefaultDictionaryWindow);