
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import AuthorPage from './components/AuthorPage/AuthorPage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
import AuthRequired from './components/common/authRequired.tsx'
import ErrorBoundary from './components/common/ErrorBoundary.tsx'
import UserDataProvider  from './components/common/Context/UserContext/UserContext.tsx'
import './App.css';



function App() {

  return (
    <BrowserRouter>
     <UserDataProvider>
      <Navbar />
      <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/book/:id' element={<Bookpage />} />
            <Route path='/author/:id' element={<AuthorPage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route element={<AuthRequired />}>
                <Route path='/userDashboard' element={<ErrorBoundary><UserDashboard 
                   /></ErrorBoundary>}></Route>
                <Route path='/bookclub/:id' element={<BookclubPage></BookclubPage>}></Route>
            </Route>
      </Routes>
      </UserDataProvider>
    </BrowserRouter>


  );
}



export default App;

