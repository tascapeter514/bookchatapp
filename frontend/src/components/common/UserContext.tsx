import {createContext, useEffect, useState, Dispatch, SetStateAction, ReactNode, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookclub, Invitation, Bookshelf, HandleLogin, ActiveUser, AuthToken } from '../../types'
import { returnErrors } from '../../messages.tsx';



interface UserContextProps {
    userBookclubs: Bookclub[],
    userInvites: Invitation[],
    userBookshelves: Bookshelf[],
    activeUser: ActiveUser,
    activeUserToken: AuthToken,
    setUserBookclubs: Dispatch<SetStateAction<Bookclub[]>>,
    setUserInvites: Dispatch<SetStateAction<Invitation[]>>,
    setUserBookshelves: Dispatch<SetStateAction<Bookshelf[]>>,
    setActiveUserToken: Dispatch<SetStateAction<AuthToken>>,
    handleLogin: HandleLogin
}



interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>({
    userBookclubs: [],
    userInvites: [],
    userBookshelves: [],
    activeUser: {
        id: 0,
        password: '',
        username: '',
        first_name: '',
        date_joined: '',
        last_name: '',
        email: '',
        profile: {
            bio: '',
            profile_pic: undefined
        }

    },
    activeUserToken: '',
    setUserBookclubs: () => [],
    setUserInvites: () => [],
    setUserBookshelves: () => [],
    setActiveUserToken: () => '',
    handleLogin: async () => {}
});

const UserDataProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {

    const navigate = useNavigate()
    const [userBookclubs, setUserBookclubs] = useState<Bookclub[]>([])
    const [userInvites, setUserInvites] = useState<Invitation[]>([])
    const [userBookshelves, setUserBookshelves] = useState<Bookshelf[]>([])
    const [activeUser, setActiveUser] = useState<ActiveUser>({
        id: 0,
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        date_joined: '',
        profile: {
            bio: '',
            profile_pic: undefined
        }
    })
    const [activeUserToken, setActiveUserToken] = useState<AuthToken>('')



    const handleLogin: HandleLogin = async (formData) => {
        console.log('handle log in check:', formData)
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
          setActiveUserToken(result.token)
          setActiveUser(result.user)
          sessionStorage.setItem('authToken', JSON.stringify(result.token))
          sessionStorage.setItem('currentUser', JSON.stringify(result.user))
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
      const storedBookclubs = sessionStorage.getItem('userBookclubs')
      const storedInvites = sessionStorage.getItem('userInvites')
      const storedBookshelves = sessionStorage.getItem('userBookshelves')
      const storedUser = sessionStorage.getItem('currentUser')
      const storedToken = sessionStorage.getItem('authToken')
      

      if (storedBookclubs) {
          setUserBookclubs(JSON.parse(storedBookclubs))
      }

      if (storedInvites) {
          setUserInvites(JSON.parse(storedInvites))
      }

      if (storedBookshelves) {
          setUserBookshelves(JSON.parse(storedBookshelves))
      }

      if (storedUser) {
          setActiveUser(JSON.parse(storedUser))
      }

      if (storedToken) {
          setActiveUserToken(storedToken)
      }



  }, [])



    useEffect(() => {
        if (!activeUser?.id) return
  
        try {
          const socket = new WebSocket(`ws://localhost:8000/ws/userData/${activeUser.id}`)
  
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'get_user_data') {

              // console.log('check to see if bookshelves update:', data.user_data.user_bookshelves)
              
              setUserBookshelves(() => {
                sessionStorage.setItem('userBookshelves', JSON.stringify(data.user_data.user_bookshelves))
                return data.user_data.user_bookshelves

              })



              sessionStorage.setItem('userBookclubs', JSON.stringify(data.user_data.user_bookclubs))
              // setUserBookclubs(data.user_data.user_bookclubs)


              sessionStorage.setItem('userInvites', JSON.stringify(data.user_data.user_invites))
              // setUserInvites(data.user_data.user_invites)
  
            }
          }
  
          socket.onerror = (error) => {
            console.error('User data websocket error', error)
          }
  
          socket.onopen = () => console.log('User data websocket connected')
          socket.onclose = () => console.log('User data websocket disconnected')
  
          return () => socket.close()
  
  
        } catch (err) {
          console.log('Failed to initalize Websocket:', err)
        }
  
  
  
      }, [ activeUser.id])

  




      return (
        <UserContext.Provider
            value={{userBookclubs, userInvites, userBookshelves, activeUser, activeUserToken, setUserBookclubs, setUserInvites, setUserBookshelves, setActiveUserToken, handleLogin}}>
                {children}
        </UserContext.Provider>
      )

}

export const userData = () => useContext(UserContext)

export default UserDataProvider