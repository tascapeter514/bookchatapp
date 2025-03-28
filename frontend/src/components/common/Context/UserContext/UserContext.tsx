import {createContext, useEffect, useState, Dispatch, SetStateAction, ReactNode, useContext, useReducer} from 'react'
import { changeContact, changePassword } from '../../services/user.tsx';
// import { addUserBookshelf } from '../../services/user.tsx';
import userTabsReducer, {TabAction, TabState} from '../../../../reducers/userTabsReducer.tsx';
import useLogger from '../../hooks/useLogger.tsx';
import {  HandleLogin, ActiveUser, AuthToken, UserData } from '../../../../types.ts'
import useSocket from '../../hooks/useSocket.tsx';



interface UserContextProps {
  // USER TABS REDUCER
  userTabs: TabState,
  tabsDispatch: Dispatch<TabAction>,



    // USERDATA REDUCER
    userData: UserData,
    setUserData: Dispatch<SetStateAction<UserData>>,
    // addUserBookshelf: (formData: FormData) => Promise<void>


    error: string | null,
    loading: boolean,
    setError: Dispatch<SetStateAction<string>>,


    // ADD HANDLE LOGOUT AND PUT INTO ACTIVEUSERREDUCER
    activeUser: ActiveUser,
    authToken: AuthToken,
    handleLogin: HandleLogin,
    setAuthToken: Dispatch<SetStateAction<AuthToken>>,
    handleRegister: (formData: FormData) => Promise<void>,
    changeContact: (formData: FormData) => Promise<void>,
    changePassword: (formData: FormData) => Promise<void>,
    
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
    userTabs: {activeTab: '', activeBookshelf: ''},
    tabsDispatch: () => {},

    setUserData: () => [],
    setError: () => '',
    handleLogin: async () => {},
    handleRegister: async () => {},
    setAuthToken: () => '',
    changeContact: async () => {},
    changePassword: async () => {},
    // addUserBookshelf: async () => {}
});

const UserDataProvider = ({ children }: UserProviderProps) => {

    const [userData, setUserData] = useState<UserData>([])
    const [userTabs, tabsDispatch] = useReducer(userTabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})
    const {activeUser, authToken, loading, error, authenticate, setActiveUser, setAuthToken, setError} = useLogger()
    const {makeRequest, data} = useSocket('ws://localhost:8000/ws/userData')
    const handleLogin = async (formData: FormData) => await authenticate('http://localhost:8000/api/auth/login', formData)
    const handleRegister = async (formData: FormData) => await authenticate('http://localhost:8000/api/auth/register', formData)


  
    useEffect(() => {

      if (!activeUser.id) return
      console.log('user context active user:', activeUser)

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

        // pass values into useMemo?
        <UserContext.Provider
            value={{activeUser, authToken, userData, error, loading, userTabs, tabsDispatch,
                  handleLogin,
                  handleRegister, 
                  changeContact: (formData) => changeContact(formData, setActiveUser),
                  changePassword: (formData) => changePassword(formData, setActiveUser),
                  setUserData,
                  setAuthToken,
                  setError,
                  // addUserBookshelf: (formData) => addUserBookshelf(formData, setUserData)
                  
                  }}>
                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider