import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo } from 'react'
import { useGetUserDataQuery } from './slices/userDataApiSlice.tsx'
import { RootState } from './store/store.tsx'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import AuthorPage from './components/AuthorPage/AuthorPage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
// import CheckMembers from './components/CheckMembers.tsx'
import './App.css';



function App() {

  console.log('app rendered')

// const { user } = useSelector((state: RootState) => state.auth)
// const userId = useMemo(() => user.id, [user.id])
// const { data } = useGetUserDataQuery(userId)
// const userData = useMemo(() => data, [data])
// const { data } = useCallback(() =>{

//   useGetUserDataQuery(user.id)

// }, [user]) 

// console.log('app level user data:', data)
// console.log('app level user error:', error)



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
              <Route path='/userDashboard'element={<UserDashboard></UserDashboard>}/>
              <Route path='/bookclub/:id' element={<BookclubPage />}></Route> 

              
        </Routes>

    </BrowserRouter>
    


  );
}



export default App;



