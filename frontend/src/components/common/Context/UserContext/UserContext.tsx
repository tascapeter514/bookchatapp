import {createContext, useEffect, useState, Dispatch, SetStateAction, ReactNode, useContext, useReducer, Reducer} from 'react'
import { changeContact, changePassword } from '../../services/user.tsx';
// import { addUserBookshelf } from '../../services/user.tsx';
import { Data } from '../../../../reducers/dataReducer.tsx';
import bookshelfReducer, {BookshelfState, BookshelfAction} from '../../../../reducers/bookshelfReducer.tsx';
import userTabsReducer, {TabAction, TabState} from '../../../../reducers/userTabsReducer.tsx';
import useLogger from '../../hooks/useLogger.tsx';
import {  HandleLogin, ActiveUser, AuthToken, UserData } from '../../../../types.ts'
import useSocket from '../../hooks/useSocket.tsx';



interface UserContextProps {
  // USER TABS REDUCER
  userTabs: TabState,
  tabsDispatch: Dispatch<TabAction>,



    // USERDATA REDUCER
    // userState: {userData: UserData},
    // stateDispatch: Dispatch<UserDataAction>,
    // userData: UserData,
    // setUserData: Dispatch<SetStateAction<UserData>>,
    // addUserBookshelf: (formData: FormData) => Promise<void>

    bookshelves: BookshelfState,
    dispatchBookshelves: Dispatch<BookshelfAction>,
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
    // userState: {userData: []},
    // userData: [],
    error: '',
    loading: false,
    userTabs: {activeTab: '', activeBookshelf: ''},
    tabsDispatch: () => {},
    // stateDispatch: () => {},
    bookshelves: {data: []},
    dispatchBookshelves: () => {},

    // setUserData: () => [],
    setError: () => '',
    handleLogin: async () => {},
    handleRegister: async () => {},
    setAuthToken: () => '',
    changeContact: async () => {},
    changePassword: async () => {},
    // addUserBookshelf: async () => {}
});


const UserDataProvider = ({ children }: UserProviderProps) => {


    // const [userState, stateDispatch] = useReducer(userDataReducer, initialState )
    const [bookshelves, dispatchBookshelves] = useReducer<Reducer<BookshelfState, BookshelfAction>>(bookshelfReducer, {data: []})
    const [userTabs, tabsDispatch] = useReducer(userTabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})
    const {userState, userDispatch, authenticate} = useLogger()
    const {data, makeRequest} = useSocket('ws://localhost:8000/ws/userData')
    const handleLogin = async (formData: FormData) => await authenticate('http://localhost:8000/api/auth/login', formData)
    const handleRegister = async (formData: FormData) => await authenticate('http://localhost:8000/api/auth/register', formData)

// const bookshelves = userData.find(data => data.type === 'bookshelf') as BookshelfData | undefined
  
    useEffect(() => {

      if (!userState.user?.id) return
      console.log('user context active user:', userState.user)

      makeRequest(userState.user?.id)
      console.log('user data:', data)

    }, [userState.user?.id, makeRequest])

    useEffect(() => {
      if (data.data && data.data.type == 'get_user_data') {
        // setUserData(data.user_data)
        dispatchBookshelves({type: 'LOAD_BOOKSHELVES', payload: data.data.find((result: Data) => result.type === 'bookshelf').items})
        



        
        sessionStorage.setItem('userData', JSON.stringify(data.data.user_data))
      }

    }, [data])




    useEffect(() => {
           const storedUserData = sessionStorage.getItem('userData');
           if (storedUserData) {
            // setUserData(JSON.parse(storedUserData))
           }
      
    }, [])

      return (

        // pass values into useMemo?
        // REMOVED USERDATA AND SETUSERDATA
        <UserContext.Provider
            value={{activeUser, authToken, error, loading, userTabs, tabsDispatch,
                  handleLogin,
                  handleRegister, 
                  changeContact: (formData) => changeContact(formData, setActiveUser),
                  changePassword: (formData) => changePassword(formData, setActiveUser),
                  setAuthToken,
                  setError,
                  bookshelves,
                  dispatchBookshelves
                  // addUserBookshelf: (formData) => addUserBookshelf(formData, setUserData)
                  
                  }}>
                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider