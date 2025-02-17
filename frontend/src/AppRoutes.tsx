import { useNavigate, Routes, Route } from 'react-router-dom';
import { FC, useEffect } from 'react'
import { returnErrors } from './messages.tsx';
import { HandleLogin } from './types.ts'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
import AuthRequired from './components/common/authRequired.tsx'
import ErrorBoundary from './components/common/ErrorBoundary.tsx'


interface AppRoutesProps {
    isAuthenticated: () => boolean,
}


const AppRoutes: FC<AppRoutesProps> = ({isAuthenticated }) => {

    const navigate = useNavigate()
    const storedUser = localStorage.getItem('currentUser')
    const activeUser = storedUser ? JSON.parse(storedUser) : null
    

    const handleLogin: HandleLogin = async (formData) => {
        try {
          const data = Object.fromEntries(formData);
    
          const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json()
        if (response.ok && result.token) {
          localStorage.setItem('authToken', JSON.stringify(result.token))
          localStorage.setItem('currentUser', JSON.stringify(result.user))
          navigate('/userDashboard')
    
        } else if (result.non_field_errors) {
          returnErrors(result.non_field_errors[0], response.status)
        } else {
          returnErrors('An unexpected error occured.', response.status)
        }
    
        } catch (err: any) {
          returnErrors(err.response.data, err.response.status)
    
        }
    };


    useEffect(() => {
      if (!activeUser?.id) return
      const fetchBookClubs = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/getBookclubMemberships/${activeUser.id}`)
          console.log('member bookclubs response:', response)
          if (response.ok) {
            const data = response.json()
            console.log('bookclub memberships data:', data)
          }
          
        } catch (err) {
          console.error(`Network error: ${err}`)
        }
      }
  
      fetchBookClubs();
  
  
  
    }, []);





   


    return(
        
        <Routes>
            
            <Route path='/' element={<Homepage />} />
            <Route path='/book/:id' element={<Bookpage />} />
            <Route path='/login' element={<Login login={handleLogin} />}></Route>
            <Route element={<AuthRequired auth={isAuthenticated} />}>
                <Route path='/userDashboard' element={<ErrorBoundary><UserDashboard  /></ErrorBoundary>}></Route>
                <Route path='/bookclub/:id' element={<BookclubPage auth={isAuthenticated}></BookclubPage>}></Route>
            </Route>
        
      </Routes>
    )
}

export default AppRoutes