import React from 'react';
import userLogo from "../../public/userLogo.svg";

const Yashodhar = ({ highlightMatch, searchString, showPadding }) => {
  return (
    <div className="logo-and-name relative h-full w-full overflow-hidden" style={{ padding: "12px" }}>
      {/* <div className="absolute bg-[#9895ed] bg-opacity-30 w-24 h-24 rounded-full blur-2xl top-10 left-10"></div>
      <div className="absolute bg-[#ffff0078] bg-opacity-30 w-32 h-32 rounded-full blur-2xl top-7 left-80"></div>
      <div className="absolute bg-green-400 bg-opacity-30 w-28 h-28 rounded-full blur-2xl top-40 left-20"></div> */}
      <div className="heading-container flex gap-x-2 flex-col gap-y-0.5 justify-center items-center">

        <div className="rounded-full bg-red-400 h-24 w-24">
          {/* image here */}
        </div>

        <p className='text-lg'>My name is <b>Yashodhar Chavan</b></p>
        <p className='text-lg'>I am a FrontEnd Developer</p>

        <div className="relative w-4/5 flex items-center justify-center" style={{margin: '8px 0px'}}>
          <hr className="w-full h-0.5 bg-gray-700 border-0 rounded" />

          <div className="absolute left-0 -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
          <div className="absolute right-0 translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
        </div>

      </div>

    </div>
  );
};

export default Yashodhar;
