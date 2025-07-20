import React, { useState, useEffect } from 'react';
import SimpleFrame from './SimpleFrame';
import ReloadIcon from '../assets/ReloadIcon.svg';
import './component.css';
import URLRedirection from './URLRedirection';
import SearchRedirection from './SearchRedirection';
import { useWindowManager } from '../context/WindowManagerContext';

const Safari = () => {
  const { optionalUrl } = useWindowManager();
  const [urlString, setUrlString] = useState(optionalUrl || 'https://www.wikipedia.com');
  const [searchString, setSearchString] = useState('');
  const [isResizing, setIsResizing] = useState(false);

  const [triggeredUrl, setTriggeredUrl] = useState(urlString);
  const [triggeredSearch, setTriggeredSearch] = useState('');

  const [toRedirect, setToRedirect] = useState(true);
  const [toSearch, setToSearch] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleReloadPage = () => {
    if (toSearch) {
      setTriggeredSearch((prev) => prev + ' '); // Trigger re-render
    } else if (toRedirect) {
      setTriggeredUrl((prev) => prev + ' '); // Trigger re-render
    }
  };




  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === 'Enter') {
        if (focusedInput === 'url') {
          setToRedirect(true);
          setToSearch(false);
          setTriggeredUrl(urlString); // Trigger only now
        } else if (focusedInput === 'search') {
          setToSearch(true);
          setToRedirect(false);
          setTriggeredSearch(searchString); // Trigger only now
        }
      }
    };

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [urlString, searchString, focusedInput]);

  return (
    <SimpleFrame
      id="safari"
      name="safari"
      title="Safari"
      icon="safari"
      height="550"
      width="850"
      minHeight="300"
      minWidth="400"
      hasPadding={false}
      isResizable={true}
      setOverflowY={false}
      onResizing={(resizing) => setIsResizing(resizing)}
    >
      <div
        className="url-bar w-full flex items-center gap-x-3"
        style={{
          background:
            'linear-gradient(rgb(199 199 199) 0%, rgb(217, 217, 217) 100%)',
          padding: '4px 8px',
        }}
      >
        <button
          className="w-12 h-6 bg-white flex items-center justify-center"
          onClick={handleReloadPage}
          style={{

            boxShadow: "inset -0.2px 0.4px 3px 0px #505050"
          }}
        >
          <img src={ReloadIcon} alt="" className="h-4" />
        </button>

        <input
          type="text"
          placeholder="enter the URL"
          id="urlInput"
          className="w-full bg-white"
          style={{ padding: '0px 4px' }}
          onChange={(e) => setUrlString(e.target.value.trim())}
          onFocus={() => setFocusedInput('url')}
        />

        <input
          type="text"
          placeholder="google"
          id="searchInput"
          className="w-[45%] rounded-2xl bg-white"
          style={{ padding: '0px 8px' }}
          onChange={(e) => setSearchString(e.target.value.trim())}
          onFocus={() => setFocusedInput('search')}
        />
      </div>

      <div className="w-full" style={{ height: 'calc(100% - 32px)' }}>
        {toRedirect && <URLRedirection url={triggeredUrl} disablePointerEvents={isResizing} />}
        {toSearch && <SearchRedirection searchString={triggeredSearch} disablePointerEvents={isResizing} />}
      </div>
    </SimpleFrame>
  );
};

export default Safari;
