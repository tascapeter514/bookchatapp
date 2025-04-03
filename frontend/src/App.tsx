import { BrowserRouter, Routes, Route } from 'react-router-dom'
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



  return (

    <BrowserRouter>

     
        <Navbar />
        <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/book/:id' element={<Bookpage />} />
              <Route path='/author/:id' element={<AuthorPage />} />
              <Route path='/login' element={<Login />} />

              <Route path='/userDashboard'element={<UserDashboard /> }/>
              <Route path='/bookclub/:id' element={<BookclubPage />}></Route> 

              
        </Routes>

    </BrowserRouter>
    


  );
}



export default App;



