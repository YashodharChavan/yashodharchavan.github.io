import '../index.css'
import './component.css'
import React from 'react'
import { useEffect } from 'react'
import topIcon from '../assets/topIcon.svg' // Uncomment if you want to use the top icon as a local image
import spotlight from '../assets/spotlight.svg' // Uncomment if you want to use the spotlight icon as a local image
import battery from '../assets/battery.png' // Uncomment if you want to use the battery icon as a local image
import { useWindowManager } from '../context/WindowManagerContext'

import finder from "../assets/icons/applications/Finder.ico";
import dashboard from "../assets/icons/applications/Dashboard.ico";
import mail from "../assets/icons/applications/Mail.ico";
import safari from "../assets/icons/applications/Safari.ico";
import contacts from "../assets/icons/applications/Contacts.ico";
import terminal from '../assets/icons/applications/Terminal.ico';
import calculator from '../assets/icons/applications/Calculator.ico';
import dictionary from '../assets/icons/applications/Dictionary.ico';
import textEdit from '../assets/icons/applications/TextEdit.ico';
import xCode from '../assets/icons/applications/XCode.ico';
import aboutme from '../assets/icons/applications/AboutMe.ico';

import genericFolderIcon from '../assets/folders/genericFolderIcon.ico'
import txt from '../assets/folders/TXT.ico'
import { fileSystem } from './Utils/fileSystem'



const TopBar = ({ currentTopComponent }) => {
  const [date, setDate] = React.useState("");
  const [isSpotlightActive, setIsSpotlightActive] = React.useState(false);
  const [searchString, setSearchString] = React.useState("")
  const [results, setResults] = React.useState([])
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const { openWindow } = useWindowManager()
  const allFilesAndFolders = collectFilesAndFolders();



  const appList = [
    { name: "Terminal", icon: terminal },
    { name: "Finder", icon: finder },
    { name: "Calculator", icon: calculator },
    { name: "Dictionary", icon: dictionary },
    { name: "Xcode", icon: xCode },
    { name: "TextEdit", icon: textEdit },
    { name: "Safari", icon: safari },
    { name: "About Me", icon: aboutme },
    { name: "Mail", icon: mail },
    { name: "Contacts", icon: contacts },
    { name: "Dashboard", icon: dashboard },
  ]

  function collectFilesAndFolders(node = fileSystem['/'], path = '/') {
    const items = [];

    for (const [name, child] of Object.entries(node.children || {})) {
      const fullPath = path === '/' ? `/${name}` : `${path}/${name}`;
      const icon = child.type === 'dir' ? genericFolderIcon : txt; // customize per extension
      items.push({
        name,
        fullPath,
        icon,
        type: child.type
      });

      if (child.type === 'dir') {
        items.push(...collectFilesAndFolders(child, fullPath));
      }
    }

    return items;
  }




  const activateSpotlightSearch = () => {
    setIsSpotlightActive(!isSpotlightActive)
  }


  const handleChange = (value) => {
    setSearchString(value);

    const filteredApps = appList.filter(app =>
      app.name.toLowerCase().includes(value.toLowerCase())
    );

    const filteredFsItems = allFilesAndFolders.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    const combinedResults = [...filteredApps, ...filteredFsItems];
    setResults(combinedResults);
    setSelectedIndex(combinedResults.length > 0 ? 0 : -1);
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
        const selectedItem = results[selectedIndex];

        if (selectedItem.type === 'file' || selectedItem.type === 'dir') {
          // Open with Finder or TextEdit depending on type
          if (selectedItem.type === 'dir') {
            openWindow('finder', "", "", "", "",  selectedItem.fullPath );
          } else {
            openWindow('textedit', "", "", "", selectedItem.name );
          }
        } else {
          openWindow(selectedItem.name.replaceAll(' ', '').toLowerCase());
        }

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
              className={`px-2 py-1 cursor-pointer flex items-center gap-x-0.5 ${index === selectedIndex ? 'bg-[#2A68C8] text-white' : ''
                }`}
            >
              <img src={item.icon} alt="" className="h-8" />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      }
    </div>
  )
}

export default TopBar