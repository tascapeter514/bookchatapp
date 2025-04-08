import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import AuthorPage from './components/AuthorPage/AuthorPage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
// import { useSelector } from 'react-redux'
// import { RootState } from './store/store.tsx'
// import { useGetUserDataQuery } from './slices/userDataApiSlice.tsx'
// import LoadSpinner from './components/LoadSpinner/LoadSpinner.tsx'
// import CheckMembers from './components/CheckMembers.tsx'
import './App.css';



function App() {







  return (

    <BrowserRouter>

     
        <Navbar />
        <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/book/:id' element={<Bookpage />} />

              {/* Can we lift author state up? */}
              <Route path='/author/:id' element={<AuthorPage />} />
              <Route path='/login' element={<Login />} />


              {/* lift userdashboard state up? */}
              <Route path='/userDashboard'element={<UserDashboard />}/>
              <Route path='/bookclub/:id' element={<BookclubPage />}></Route> 

              
        </Routes>

    </BrowserRouter>
    


  );
}



export default App;



