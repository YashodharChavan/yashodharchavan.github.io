// SearchRedirection.jsx
import React, { useRef, useEffect } from 'react';

const SearchRedirection = ({ searchString, disablePointerEvents }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.style.pointerEvents = disablePointerEvents ? 'none' : 'auto';
    }
  }, [disablePointerEvents]);

  if (!searchString) return null;

  const encodedQuery = encodeURIComponent(searchString);
  const searchUrl = `https://www.google.com/search?q=${encodedQuery}&igu=1`;

  return (
    <iframe
      loading='lazy'
      ref={iframeRef}
      src={searchUrl}
      title="Google Search"
      className="w-full h-full border-none overflow-y-auto"
    />
  );
};

export default React.memo(SearchRedirection);
