import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {useContext} from 'react'
import { AuthContext } from './context/authContext/authContext.tsx'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import AuthorPage from './components/AuthorPage/AuthorPage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
import CheckMembers from './components/CheckMembers.tsx'

import './App.css';




// element={<UserDashboard />}
function App() {

  const { isLoggedIn, authToken} = useContext(AuthContext)
  console.log('app is logged in:', isLoggedIn)
  console.log('app authToken:', authToken)

  return (

    <BrowserRouter>

     
        <Navbar />
        <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/book/:id' element={<Bookpage />} />
              <Route path='/author/:id' element={<AuthorPage />} />
              <Route path='/login' element={<Login />} />

              <Route 
                path='/userDashboard'
                element={isLoggedIn && authToken ? <UserDashboard /> : <Navigate to='/login' /> }
              /> 

              
        </Routes>

    </BrowserRouter>
    


  );
}



export default App;

{/* <Route path='/bookclub/:id' element={<CheckMembers><BookclubPage /></CheckMembers>}></Route> */}

