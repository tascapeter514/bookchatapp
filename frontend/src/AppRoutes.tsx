import { Routes, Route } from 'react-router-dom';
import { FC } from 'react'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
import AuthRequired from './components/common/authRequired.tsx'
import ErrorBoundary from './components/common/ErrorBoundary.tsx'
import UserDataProvider from './components/common/UserContext.tsx'


interface AppRoutesProps {
    isAuthenticated: () => boolean,
}


const AppRoutes: FC<AppRoutesProps> = ({isAuthenticated }) => {

    

    return(
        
        <Routes>
            
            <Route path='/' element={<Homepage />} />
            <Route path='/book/:id' element={<Bookpage />} />
            <Route path='/login' element={<Login />}></Route>
            <Route element={<AuthRequired auth={isAuthenticated} />}>
                <Route path='/userDashboard' element={<ErrorBoundary><UserDataProvider><UserDashboard 
                   /></UserDataProvider></ErrorBoundary>}></Route>
                <Route path='/bookclub/:id' element={<UserDataProvider><BookclubPage></BookclubPage></UserDataProvider>}></Route>
            </Route>
        
      </Routes>
    )
}

export default AppRoutes