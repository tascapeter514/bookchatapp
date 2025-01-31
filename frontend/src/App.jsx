
import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Homepage from './components/Homepage/Homepage.jsx'
import Bookpage from './components/Bookpage/Bookpage.jsx'

import './App.css';

function App() {

  
  return (
    <BrowserRouter>
      <Navbar></Navbar>
     
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/book/:id' element={<Bookpage />} />
      </Routes>
    </BrowserRouter>


  );
}



export default App;

