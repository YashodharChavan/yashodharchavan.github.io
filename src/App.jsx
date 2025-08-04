import React, { useEffect, useState, useCallback, memo } from "react";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";

const App = () => {
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const enableFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(); // Safari
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen(); // IE11
      }
    };

    const handleClick = () => {
      enableFullscreen();
      document.removeEventListener("click", handleClick);
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);
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
    <div className="w-fit min-w-[1024px] max-w-full overflow-hidden aspect-[4/3]" style={{
      margin: "0 auto",
      height: `${height}px`
    }}>
      {showBootScreen ? <BootScreen /> : <Desktop />}
      {/* <Desktop /> */}
    </div>
  );
};

export default memo(App);
