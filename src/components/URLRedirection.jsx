// URLRedirection.jsx
import React, { useRef, useEffect } from 'react';

const URLRedirection = ({ url, disablePointerEvents }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.style.pointerEvents = disablePointerEvents ? 'none' : 'auto';
    }
  }, [disablePointerEvents]);

  if (!url) return null;

  return (
    <iframe
      loading='lazy'
      ref={iframeRef}
      src={url}
      title="Search Results"
      className="w-full h-full border-none overflow-y-auto"
    />
  );
};

export default React.memo(URLRedirection);
