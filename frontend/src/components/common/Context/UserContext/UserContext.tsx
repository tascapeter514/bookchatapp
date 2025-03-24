import {createContext, useEffect, useState, Dispatch, SetStateAction, ReactNode, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { changeContact, changePassword } from '../../services/user.tsx';
import { addUserBookshelf } from '../../services/user.tsx';
import useLogger from '../../hooks/useLogger.tsx';
import {  HandleLogin, ActiveUser, AuthToken, UserData } from '../../../../types.ts'
import useSocket from '../../hooks/useSocket.tsx';



interface UserContextProps {
    activeUser: ActiveUser,
    authToken: AuthToken,
    userData: UserData[],
    error: string | null,
    loading: boolean,
    setUserData: Dispatch<SetStateAction<UserData[]>>,
    // setActiveUserToken: Dispatch<SetStateAction<AuthToken>>,
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
    authToken: '',
    userData: [],
    error: '',
    loading: false,
    setUserData: () => [],
    // setActiveUserToken: () => '',
    handleLogin: async () => {},
    changeContact: async () => {},
    changePassword: async () => {},
    // addUserBookshelf: async () => {}
});

const UserDataProvider = ({ children }: UserProviderProps) => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState<UserData[]>([])
    const {activeUser, authToken, loading, error, login, setActiveUser} = useLogger('http://localhost:8000/api/auth/login')
    const {makeRequest, data} = useSocket('ws://localhost:8000/ws/userData')
    

    
    const handleLogin = async (formData: FormData) => {

      try {
        await login(formData)
        navigate('/userDashboard')  
      } catch(err) {
        console.error('Error with handleLogin:', err)
      }

    }

    console.log('active user and token:', activeUser, authToken)


    useEffect(() => {

      if (!activeUser.id) return


      makeRequest(activeUser.id)
      console.log('user data:', data)
    }, [activeUser.id, makeRequest])

    useEffect(() => {
      if (data && data.type == 'get_user_data') {
        setUserData(data.user_data)
        sessionStorage.setItem('userData', JSON.stringify(data.user_data))
      }

    }, [data])


    useEffect(() => {
           const storedUserData = sessionStorage.getItem('userData');
           if (storedUserData) {
            setUserData(JSON.parse(storedUserData))
           }
      
    }, [])

      return (
        <UserContext.Provider
            value={{activeUser, authToken, userData, error, loading,
                  handleLogin, 
                  changeContact: (formData) => changeContact(formData, setActiveUser),
                  changePassword: (formData) => changePassword(formData, setActiveUser),
                  setUserData,
                  // addUserBookshelf: (formData) => addUserBookshelf(formData, setUserData)
                  
                  }}>
                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider