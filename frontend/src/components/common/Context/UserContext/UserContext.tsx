import {createContext, Dispatch, ReactNode, useContext, useReducer,  useMemo} from 'react'
import {UserState, UserAction} from '../../../../reducers/userReducer.tsx'
import userTabsReducer, {TabAction, TabState} from '../../../../reducers/userTabsReducer.tsx';
import useLogger from '../../hooks/useLogger.tsx';

interface Props {
  handleLogin: (formData: FormData) => Promise<void>
  userState: UserState,
  userTabs: TabState,
  tabsDispatch: Dispatch<TabAction>,
  dispatchUser: Dispatch<UserAction>,
}

interface ProviderProps {
    children: ReactNode
}

export const UserContext = createContext<Props>({
    
    userState: {user: null, authToken: '', isLoggedIn: false, isLoading: false, isError: false, error: ''},
    userTabs: {activeTab: '', activeBookshelf: ''},
    handleLogin : async () => {},
    dispatchUser: () => {},
    tabsDispatch: () => {},


});

const UserDataProvider = ({ children }: ProviderProps) => {


    const [userTabs, tabsDispatch] = useReducer(userTabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})
    const {userState, dispatchUser, authenticate} = useLogger()
    const handleLogin = async (formData: FormData) => await authenticate('http://localhost:8000/api/auth/login', formData)
      
    const userContextValue = useMemo(() => ({

      userState,
      userTabs,
      dispatchUser,
      tabsDispatch,
      handleLogin,

    }), [userState, userTabs, handleLogin])




      return (

        <UserContext.Provider
            value={userContextValue}>
                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider
