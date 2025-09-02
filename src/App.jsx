import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaSearch } from "react-icons/fa";

function App() {
 

  return (
    <>
  <div className='container'>
    <p>Weather app</p>

    <div className='search-container'>
      <input type="text" placeholder="Enter city name"  className='city-input'/>
      <button className='search-btn'> <FaSearch/></button>
      <div className='weather-info'>
        {/* Weather information will be displayed here */}
      </div>
      
    </div>
  </div>
    </>
  )
}

export default App
