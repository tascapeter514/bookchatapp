import {createContext, useEffect, useState, Dispatch, SetStateAction, ReactNode, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { changeContact, changePassword } from '../../services/user.tsx';
import { addUserBookshelf } from '../../services/user.tsx';
import {  HandleLogin, ActiveUser, AuthToken, UserData } from '../../../../types.ts'
import { returnErrors } from '../../../../messages.tsx';
import useSocket from '../../hooks/useSocket.tsx';



interface UserContextProps {
    activeUser: ActiveUser,
    activeUserToken: AuthToken,
    userData: UserData[],
    setUserData: Dispatch<SetStateAction<UserData[]>>,
    setActiveUserToken: Dispatch<SetStateAction<AuthToken>>,
    handleLogin: HandleLogin,
    changeContact: (formData: FormData) => Promise<void>,
    changePassword: (formData: FormData) => Promise<void>,
    // addUserBookshelf: (formData: FormData) => Promise<void>
}



interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>({
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
    userData: [],
    setUserData: () => [],
    setActiveUserToken: () => '',
    handleLogin: async () => {},
    changeContact: async () => {},
    changePassword: async () => {},
    // addUserBookshelf: async () => {}
});

const UserDataProvider = ({ children }: UserProviderProps) => {

    const navigate = useNavigate()
    const [activeUser, setActiveUser] = useState<ActiveUser>({
        id: NaN,
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
    const [userData, setUserData] = useState<UserData[]>([])

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
          sessionStorage.setItem('activeUser', JSON.stringify(result.user))
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

    const {makeRequest, data} = useSocket('ws://localhost:8000/ws/userData')


    useEffect(() => {
      console.log('use effect run')
      if (!activeUser.id) return

      console.log('make request run')
      makeRequest(activeUser.id)
      console.log('user data:', data)
    }, [activeUser.id, makeRequest])

    useEffect(() => {
      if (data && data.type == 'get_user_data') {
        console.log('received user data:', data)
        setUserData(data.user_data)
        sessionStorage.setItem('userData', JSON.stringify(data.user_data))
      }

    }, [data])

    // console.log('user data context:', userData)

    useEffect(() => {
           const storedUser = sessionStorage.getItem('currentUser')
           const storedToken = sessionStorage.getItem('authToken')
           const storedUserData = sessionStorage.getItem('userData')

           if (storedUser) {
            setActiveUser(JSON.parse(storedUser))
           }
           if (storedToken) {
            setActiveUserToken(JSON.parse(storedToken))
           }
           if (storedUserData) {
            setUserData(JSON.parse(storedUserData))
           }
      
    }, [])


      // console.log('context active user:', activeUser)

      
      return (
        <UserContext.Provider
            value={{activeUser, activeUserToken, userData,
                  setUserData,
                   setActiveUserToken, handleLogin, 
                  changeContact: (formData) => changeContact(formData, setActiveUser),
                  changePassword: (formData) => changePassword(formData, setActiveUser),
                  // addUserBookshelf: (formData) => addUserBookshelf(formData, setUserData)
                  
                  }}>
                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider