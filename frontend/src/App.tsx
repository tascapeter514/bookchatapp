
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

  const handleLogout: HandleLogout = async () => {
    console.log('handle logout check')
    const token = localStorage.getItem('authToken');
    try {
      if (token) {
        await fetch('http:localhost:8000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Token ${JSON.parse(token)}`
          }
        });
      }
    } catch (error) {
      console.error('Error during logout', error)
    } finally {
      // Clear client-side data regardless of server response
      localStorage.removeItem('authToken')
      setCurrentUser(null)
    }
  };

  
  console.log('current user:', currentUser)

  

  return (
    <BrowserRouter>
      <Navbar auth={isAuthenticated} logout={handleLogout}></Navbar>
      <AppRoutes isAuthenticated={isAuthenticated} currentUser={currentUser} setCurrentUser={setCurrentUser} />
     
      
    </BrowserRouter>


  );
}



export default App;

