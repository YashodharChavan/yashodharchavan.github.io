import React from 'react'
import userLogo from "../../public/userLogo.svg"


const Yashodhar = ({highlightMatch, searchString, showPadding}) => {
  return (
    <>
        <div className="logo-and-name h-full w-full bg-red-500">
            {highlightMatch("this needs to be done like mobile view I am keeping it pending because I dont have ideas regarding it", searchString)}
            
        </div>  
    
    </>

  )
}

export default Yashodhar