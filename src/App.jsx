import React, { useEffect, useState, useCallback, memo } from "react";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";

const App = () => {
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [height, setHeight] = useState(window.innerHeight);

  // Setup resize listener once
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Delay Desktop rendering until after boot duration
  useEffect(() => {
    const timer = setTimeout(() => setShowBootScreen(false), 6000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="w-fit min-w-[1024px] max-w-full overflow-hidden aspect-[4/3]" style={{margin: "0 auto",
    height: `${height}px`}}>
      {showBootScreen ? <BootScreen /> : <Desktop />}
    </div>
  );
};

export default memo(App);
