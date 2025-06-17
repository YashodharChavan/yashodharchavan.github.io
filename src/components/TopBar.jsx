import '../index.css'
import './component.css'
import React from 'react'
import { useEffect } from 'react'
import topIcon from '../assets/topIcon.svg' // Uncomment if you want to use the top icon as a local image
import spotlight from '../assets/spotlight.svg' // Uncomment if you want to use the spotlight icon as a local image
import battery from '../assets/battery.png' // Uncomment if you want to use the battery icon as a local image
import { useWindowManager } from '../context/WindowManagerContext'
const TopBar = ({ currentTopComponent }) => {

  const [date, setDate] = React.useState("");
  const [isSpotlightActive, setIsSpotlightActive] = React.useState(false);
  const [searchString, setSearchString] = React.useState("")
  const [results, setResults] = React.useState([])
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const {openWindow} = useWindowManager()

  const appList = ['Terminal', 'TextEdit', 'Contacts', 'Dictionary', 'Calculator', 'XCode', 'Safari', 'Mail', 'Dashboard', 'Finder', 'About Me']



  const activateSpotlightSearch = () => {
    setIsSpotlightActive(!isSpotlightActive)
  }

  const handleChange = (value) => {
    setSearchString(value);
    const filtered = appList.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
    setSelectedIndex(0); // Reset selection
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSpotlightActive) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      }

      if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const selectedApp = results[selectedIndex];
        console.log('Launching:', selectedApp);
        openWindow(selectedApp.replaceAll(' ', '').toLowerCase())
        // TODO: launch the app component (use context/props/callback)
        setIsSpotlightActive(false);
        setSearchString('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpotlightActive, results, selectedIndex]);



  useEffect(() => {
    const now = new Date();
    const options = {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    const formatted = now.toLocaleString('en-US', options);
    setDate(formatted);
  }, []); // Runs only once after first render

  return (
    <div className='w-full h-6 flex items-center select-none justify-between padding-top shadow-md rounded-tl-md rounded-tr-md' style={{
      background: 'linear-gradient(to bottom, #FDFDFD 0%, #FDFDFD 25%, #F2F2F2 25%, #F2F2F2 75%, #FDFDFD 75%, #FDFDFD 100%)'
    }}>

      <div className="left-content flex items-center gap-x-5">
        <img src={topIcon} alt="" className='h-5' />
        <p className='font-semibold'>{currentTopComponent || "Name"} </p>
        <p className='font-medium'>File</p>
        <p className='font-medium'>Edit</p>
        <p className='font-medium'>View</p>
        <p className='font-medium'>Go</p>
        <p className='font-medium'>Window</p>
        <p className='font-medium'>Help</p>
      </div>
      <div className="right-content flex items-center gap-x-5">
        <div className="flex items-center gap-x-5">

          <img src={battery} alt="" className='h-5' />
          <p>{date}</p>
          <div className='w-8 flex justify-center' onClick={activateSpotlightSearch}>

            <img src={spotlight} alt="" className='h-5' />
          </div>
        </div>
      </div>

      {isSpotlightActive && <div className="bg-red-400 h-8 w-96 z-10 right-44 top-6 absolute flex items-center justify-end gap-x-3"
        style={{
          background: "linear-gradient(rgb(38, 129, 234) 30%, rgb(2, 84, 205) 70%)",
          boxShadow: "0px 7px 16px 0px #00000099",
          padding: "0px 8px"
        }}
      >

        <span className="text-white font-sans">Spotlight</span>
        <input type="text" className='bg-white focus:outline-none outline-none rounded-2xl w-60'
          style={{ padding: "0px 8px" }} autoFocus={true} onChange={(e) => handleChange(e.target.value)} />
      </div>}

      {searchString && <div className="absolute top-14 w-96 right-44 h-fit z-10 bg-[#E7EDF2]"
        style={{ boxShadow: "0px 7px 16px 0px #00000099" }}>
        <ul>

          {results.map((item, index) => (
            <li
              key={index}
              className={`px-2 py-1 cursor-pointer ${index === selectedIndex ? 'bg-[#2A68C8] text-white' : ''
                }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      }
    </div>
  )
}

export default TopBar