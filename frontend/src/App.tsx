
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import Login from './components/LogIn/Login.tsx'

import './App.css';

function App() {



  
  return (
    <BrowserRouter>
      <Navbar></Navbar>
     
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/book/:id' element={<Bookpage />} />
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>


  );
}



export default App;

