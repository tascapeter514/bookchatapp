import {createContext, useEffect, useState, Dispatch, SetStateAction, ReactNode, useContext, useReducer, Reducer} from 'react'
import userReducer, {UserState, UserAction} from '../../../../reducers/userReducer.tsx'
import { changeContact, changePassword } from '../../services/user.tsx';
// import { addUserBookshelf } from '../../services/user.tsx';
import { Data } from '../../../../reducers/dataReducer.tsx';
import bookshelfReducer, {BookshelfState, BookshelfAction} from '../../../../reducers/bookshelfReducer.tsx';
import userTabsReducer, {TabAction, TabState} from '../../../../reducers/userTabsReducer.tsx';
import useLogger from '../../hooks/useLogger.tsx';

import useSocket from '../../hooks/useSocket.tsx';



interface UserContextProps {
  // USER TABS REDUCER
  userTabs: TabState,
  tabsDispatch: Dispatch<TabAction>,



    // USERDATA REDUCER
    userState: UserState,
    userDispatch: Dispatch<UserAction>,



    bookshelves: BookshelfState,
    dispatchBookshelves: Dispatch<BookshelfAction>,



    // ADD HANDLE LOGOUT AND PUT INTO ACTIVEUSERREDUCER
    // handleLogin: HandleLogin,

    // handleRegister: (formData: FormData) => Promise<void>,
    // changeContact: (formData: FormData) => Promise<void>,
    // changePassword: (formData: FormData) => Promise<void>,
    
}



interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>({
    
    userState: {user: null, authToken: '', isLoggedIn: false, isLoading: false, isError: false, error: ''},
    userDispatch: () => {},
    
    userTabs: {activeTab: '', activeBookshelf: ''},
    tabsDispatch: () => {},

    bookshelves: {data: []},
    dispatchBookshelves: () => {},


    
    // handleLogin: async () => {},
    // handleRegister: async () => {},
    // changeContact: async () => {},
    // changePassword: async () => {},
    // addUserBookshelf: async () => {}
});


const UserDataProvider = ({ children }: UserProviderProps) => {


    const [userState, userDispatch] = useReducer<Reducer<UserState, UserAction>>(userReducer, {
      user: {
          id: 0,
          password: '',
          username: '',
          firstName: '',
          lastName: '',
          emailAddress: '',
          dateJoined: '',
          profile: {
              bio: '',
              profilePic: undefined

          }
      },
      authToken: '',
      isLoggedIn: false,
      isLoading: false,
      isError: false,
      error: ''
    })
    const [bookshelves, dispatchBookshelves] = useReducer<Reducer<BookshelfState, BookshelfAction>>(bookshelfReducer, {data: []})
    const [userTabs, tabsDispatch] = useReducer(userTabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})
    const {data, makeRequest} = useSocket('ws://localhost:8000/ws/userData')
    


  
    useEffect(() => {

      if (!userState.user?.id) return
      console.log('user context active user:', userState.user)

      makeRequest(userState.user?.id)
      console.log('user data:', data)

    }, [userState.user?.id, makeRequest])

    useEffect(() => {
      if (data.data && data.data.type == 'get_user_data') {
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
            value={{userState,
                    userDispatch,
                    userTabs,
                    tabsDispatch,
                    bookshelves,
                    dispatchBookshelves
                  
                  }}>

                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider



// DO WE NEED HANDLERS?
// handleLogin,
// handleRegister, 
// changeContact: (formData) => changeContact(formData, setActiveUser),
// changePassword: (formData) => changePassword(formData, setActiveUser),