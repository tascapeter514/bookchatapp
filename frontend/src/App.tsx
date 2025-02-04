
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react';
import {  CurrentUser, HandleLogout } from './types.ts'
import Navbar from './components/Navbar/Navbar.tsx'
import AppRoutes from './AppRoutes.tsx'
import './App.css';



function App() {

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)



  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false
    } else {
      return true
    }
  }


  

  
  console.log('current user:', currentUser)

  

  return (
    <BrowserRouter>
      <Navbar auth={isAuthenticated} setCurrentUser={setCurrentUser}></Navbar>
      <AppRoutes isAuthenticated={isAuthenticated} currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </BrowserRouter>


  );
}



export default App;

