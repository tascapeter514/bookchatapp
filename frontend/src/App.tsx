import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useContext} from 'react'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import AuthorPage from './components/AuthorPage/AuthorPage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import AuthRequired from './components/authRequired.tsx'
import CheckMembers from './components/CheckMembers.tsx'
import UserDataProvider  from './context/UserContext/UserContext.tsx'
import './App.css';



function App() {

  return (

    <BrowserRouter>

     
        <Navbar />
        <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/book/:id' element={<Bookpage />} />
              <Route path='/author/:id' element={<AuthorPage />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route element={<AuthRequired />}>
                  <Route path='/userDashboard' element={<ErrorBoundary><UserDashboard /></ErrorBoundary>}></Route>
              </Route>
              {/* <Route path='/bookclub/:id' element={<CheckMembers><BookclubPage /></CheckMembers>}></Route> */}
        </Routes>

    </BrowserRouter>
    


  );
}



export default App;

