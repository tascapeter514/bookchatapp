
import React, {useState, useEffect, useRef} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage/Homepage.jsx'
import Bookpage from './components/Bookpage/Bookpage.jsx'

import './App.css';

function App() {

  




  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/book/:id' element={<Bookpage />} />
      </Routes>
    </BrowserRouter>


  );
}



export default App;

