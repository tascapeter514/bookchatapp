import { useNavigate, Routes, Route } from 'react-router-dom';
import { FC } from 'react'
import { returnErrors } from './messages.tsx';
import { HandleLogin, CurrentUser } from './types.ts'
import Homepage from './components/Homepage/Homepage.tsx'
import Bookpage from './components/Bookpage/Bookpage.tsx'
import BookclubPage from './components/BookclubPage/BookclubPage.tsx'
import Login from './components/LogIn/Login.tsx'
import UserDashboard from './components/UserDashboard/UserDashboard.tsx'
import AuthRequired from './components/common/authRequired.tsx'


interface AppRoutesProps {
    currentUser: CurrentUser | null,
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
    isAuthenticated: () => boolean,
}


const AppRoutes: FC<AppRoutesProps> = ({ currentUser, setCurrentUser, isAuthenticated }) => {
    const navigate = useNavigate()
    const localToken = localStorage.getItem('authToken')
    console.log('local token:', localToken)
    

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
        console.log('result:', result)
        console.log('token', result.token)
        if (response.ok && result.token) {
          setCurrentUser(result)
          localStorage.setItem('authToken', JSON.stringify(result.token))
          localStorage.setItem('currentUser', JSON.stringify(result.user))
          // navigate('/userDashboard')
    
        } else if (result.non_field_errors) {
          returnErrors(result.non_field_errors[0], response.status)
        } else {
          returnErrors('An unexpected error occured.', response.status)
        }
    
        } catch (err: any) {
          returnErrors(err.response.data, err.response.status)
    
        }
    };

   


    return(
        
        <Routes>
            
            <Route path='/' element={<Homepage />} />
            <Route path='/book/:id' element={<Bookpage user={currentUser} />} />
            <Route path='/login' element={<Login login={handleLogin} user={currentUser} />}></Route>
            <Route element={<AuthRequired auth={isAuthenticated} />}>
                <Route path='/userDashboard' element={<UserDashboard user={currentUser}  />}></Route>
                <Route path='/bookclub/:id' element={<BookclubPage user={currentUser} auth={isAuthenticated}></BookclubPage>}></Route>
            </Route>
        
      </Routes>
    )
}

export default AppRoutes