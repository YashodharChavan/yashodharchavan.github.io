import React, { useRef, useEffect, useState } from 'react';

const Ruler = ({ unit = 50, step = 10 }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth(); // Initial width
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const totalSteps = Math.floor(width / step);

  return (
    <div
      ref={containerRef}
      className="relative h-3.5 bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 shadow-sm w-full select-none"
      style={{margin: "0px 4px"}}
    >
      {Array.from({ length: totalSteps }).map((_, i) => {
        const x = i * step;
        const isMajor = i % (unit / step) === 0;

        return (
          <div
            key={i}
            className="absolute bottom-0"
            style={{ left: `${x}px` }}
          >
            <div
              className="bg-gray-600 w-[1px]"
              style={{ height: isMajor ? '12px' : '6px' }}
            />
            {isMajor && (
              <div
                className="text-[9px] text-gray-700 absolute top-full translate-x-[-50%] mt-0.5"
              >
                {x}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Ruler);