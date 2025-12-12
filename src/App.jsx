import React, { useEffect, useState, memo } from "react";
import BootScreen from "./components/BootScreen";
import Desktop from "./components/Desktop";

const App = () => {
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [height, setHeight] = useState(window.innerHeight);

  // Fullscreen activation
  useEffect(() => {
    const enableFullscreen = () => {
      const elem = document.documentElement;
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    };

    const handleClick = () => {
      enableFullscreen();
      document.removeEventListener("click", handleClick);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Timer to hide boot screen (overlay)
  useEffect(() => {
    const timer = setTimeout(() => setShowBootScreen(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="w-fit min-w-[1024px] max-w-full overflow-hidden aspect-[4/3] relative"
      style={{
        margin: "0 auto",
        height: `${height}px`,
      }}
    >
      {/* Desktop always renders immediately */}
      <Desktop />

      {/* Boot screen overlay */}
      {showBootScreen && (
        <div
          className="absolute inset-0 z-[9999]"
          style={{
            pointerEvents: "none", // prevents blocking clicks before fullscreen
          }}
        >
          <BootScreen />
        </div>
      )}
    </div>
  );
};

export default memo(App);
