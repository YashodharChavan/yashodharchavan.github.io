import { useEffect, useState } from "react";
import BootScreen from "./components/BootScreen";
import React from "react";
import TopBar from "./components/TopBar";

const App = () => {

  const [showBootScreen, setShowBootScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBootScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }
    , []);

  return (
    <>
      <div className="w-[1024px] max-w-full aspect-[4/3] h-full" style={{margin: "0 auto"}}>

        {showBootScreen && <BootScreen />}

        {!showBootScreen && (
          <TopBar />
        )}

      </div>
    </>
  )
}

export default App