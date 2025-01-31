
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'

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

