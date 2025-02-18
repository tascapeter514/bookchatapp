import { useNavigate, Routes, Route } from 'react-router-dom';
import { FC, useEffect, useState } from 'react'
import { returnErrors } from './messages.tsx';
import { HandleLogin, Invitation, Bookclub } from './types.ts'
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
    const [invites, setInvites] = useState<Invitation[]>([])
    const [userBookclubs, setUserBookclubs] = useState<Bookclub[]>([])

    

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
      try {
          const socket = new WebSocket(`ws://localhost:8000/ws/bookchat/getBookclubs/${activeUser.id}`)

          socket.onmessage = (event) => {
              const data = JSON.parse(event.data)
              if (data.type === 'get_bookclubs') {
                setUserBookclubs(data.bookclubs)
              }
              
          }

          socket.onerror = (error) => {
              console.error('Websocket error:', error)
          }

          socket.onopen = () => console.log('Bookclub websocket connected')
          socket.onclose = () => console.log('Bookclub websocket disconnected')

          return () => socket.close()


      } catch (err) {
          console.error('Failed to initialize Websocket:', err)
      }
  }, [])

    console.log('user bookclubs: ', userBookclubs)

    useEffect(() => {
      if (!activeUser?.id) return;
      try {
        const socket = new WebSocket(`ws://localhost:8000/ws/bookchat/getUserInvites/${activeUser.id}`)

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data)
          console.log('user invites data:', data)
          if (data.type === 'get_invites') {
            console.log('get user invites:', data.user_invites)
            setInvites(data.user_invites)
          }

        }

        socket.onerror = (error) => {
          console.error('User Invite Websocket error:', error)
        }

        socket.onopen = () => console.log('User Invite Websocket Connected')
        socket.onclose = () => console.log('User Invite Websocket disconnected')

        return () => socket.close()

      } catch(err) {
        console.error("Failed to initialize invitations websocket", err)
      }
    }, [])





   


    return(
        
        <Routes>
            
            <Route path='/' element={<Homepage />} />
            <Route path='/book/:id' element={<Bookpage />} />
            <Route path='/login' element={<Login login={handleLogin} />}></Route>
            <Route element={<AuthRequired auth={isAuthenticated} />}>
                <Route path='/userDashboard' element={<ErrorBoundary><UserDashboard 
                  userBookclubs={userBookclubs}
                  setUserBookclubs={setUserBookclubs} 
                  userInvites={invites}  /></ErrorBoundary>}></Route>
                <Route path='/bookclub/:id' element={<BookclubPage userBookclubs={userBookclubs}></BookclubPage>}></Route>
            </Route>
        
      </Routes>
    )
}

export default AppRoutes