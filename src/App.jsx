import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import React from "react";
import Desktop from "./components/Desktop";
import { WindowManagerProvider } from './context/WindowManagerContext';

// In App.jsx or Desktop.jsx


const App = () => {

  const [showBootScreen, setShowBootScreen] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBootScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }
    , []);

  window.addEventListener("resize", () => {
    setHeight(window.innerHeight);
  }
  );

  return (
    <>


      <div className="w-[1024px] max-w-full overflow-hidden aspect-[4/3]" style={{margin: "0 auto", height: `${height}px`}}>

        {showBootScreen && <BootScreen />}

        {!showBootScreen && (
          <Desktop />
        )}

      </div>
    </>
  )
}

export default App