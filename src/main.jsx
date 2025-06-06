import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { WindowManagerProvider } from './context/WindowManagerContext';


createRoot(document.getElementById('root')).render(

    <WindowManagerProvider>
      <App />
    </WindowManagerProvider>
)
