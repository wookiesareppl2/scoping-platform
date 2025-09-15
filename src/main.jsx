import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Initialize performance monitoring after React app is mounted
setTimeout(async () => {
  try {
    const { initializePerformanceMonitoring } = await import('./utils/performance.js');
    initializePerformanceMonitoring();
  } catch (error) {
    console.warn('Failed to initialize performance monitoring:', error);
  }
}, 1000);