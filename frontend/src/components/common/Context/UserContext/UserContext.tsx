import {createContext, useEffect, Dispatch, ReactNode, useContext, useReducer, Reducer, useMemo, useState} from 'react'
import userReducer, {UserState, UserAction} from '../../../../reducers/userReducer.tsx'
import { Data } from '../../../../reducers/dataReducer.tsx';
import bookshelfReducer, {BookshelfState, BookshelfAction} from '../../../../reducers/bookshelfReducer.tsx';
import bookclubReducer, {BookclubState, BookclubAction} from '../../../../reducers/bookclubReducer.tsx';
import inviteReducer, {InviteState, InviteAction} from '../../../../reducers/inviteReducer.tsx';
import userTabsReducer, {TabAction, TabState} from '../../../../reducers/userTabsReducer.tsx';
import useSocket from '../../hooks/useSocket.tsx';
import useLogger from '../../hooks/useLogger.tsx';

interface UserContextProps {

  userState: UserState,
  bookshelves: BookshelfState,
  bookclubs: BookclubState,
  invitations: InviteState,
  userTabs: TabState,
  userDispatch: Dispatch<UserAction>,
  bookshelfDispatch: Dispatch<BookshelfAction>,
  bookclubDispatch: Dispatch<BookclubAction>,
  inviteDispatch: Dispatch<InviteAction>
  tabsDispatch: Dispatch<TabAction>,
  handleLogin: (formData: FormData) => Promise<void> 

}

interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>({
    
    userState: {user: null, authToken: '', isLoggedIn: false, isLoading: false, isError: false, error: ''},
    bookshelves: {data: [], isError: false, error: ''},
    bookclubs: {data: []},
    invitations: { data: []},
    userTabs: {activeTab: '', activeBookshelf: ''},
    handleLogin : async (formData: FormData) => {},
    userDispatch: () => {},
    bookshelfDispatch: () => {},
    bookclubDispatch: () => {},
    inviteDispatch: () => {},
    tabsDispatch: () => {},


});

// console.log('log in fired' ) 
const UserDataProvider = ({ children }: UserProviderProps) => {

  const [userState, userDispatch] = useReducer<Reducer<UserState, UserAction>>(userReducer, {
    user: null,
    authToken: '',
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    error: ''
  })
    
    const [bookshelves, bookshelfDispatch] = useReducer<Reducer<BookshelfState, BookshelfAction>>(bookshelfReducer, {data: [], isError: false, error: ''})
  
    const [bookclubs, bookclubDispatch] = useReducer<Reducer<BookclubState, BookclubAction>>(bookclubReducer, {data: []})
    const [invitations, inviteDispatch] = useReducer<Reducer<InviteState, InviteAction>>(inviteReducer, {data: []})
    const [userTabs, tabsDispatch] = useReducer(userTabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})
    const { authenticate} = useLogger(userDispatch)
    const {data, makeRequest} = useSocket('ws://localhost:8000/ws/userData')
    const handleLogin = async (formData: FormData) => { await authenticate('http://localhost:8000/api/auth/login', formData)}
    
    console.log('user context userState:', userState)
    

    useEffect(() => {

      console.log('user state use effect')

      if (!userState.user?.id) return
      console.log('user context active user:', userState.user)

      makeRequest(userState.user?.id)
      console.log('user data:', data)

    }, [userState.user?.id, makeRequest])

    useEffect(() => {
      console.log('data use effect')
      console.log('use effect data:', data.data)
      if (data.data && data.data.type == 'get_user_data') {

        
        console.log('user context incoming data:', data.data.bookshelves)
        // bookshelfDispatch({type: 'LOAD_BOOKSHELVES', payload: data.data.bookshelves})
        bookclubDispatch({type: 'LOAD_BOOKCLUBS', payload: data.data.bookclubs})
        inviteDispatch({type: 'LOAD_INVITES', payload: data.data.invitations})
        sessionStorage.setItem('bookshelves', JSON.stringify(data.data.bookshelves))
        sessionStorage.setItem('bookclubs', JSON.stringify(data.data.bookclubs))
        sessionStorage.setItem('invitations', JSON.stringify(data.data.invitations))
        
        
      }

    }, [data.data])

    sessionStorage.removeItem('activeUser')
    sessionStorage.removeItem('authToken')


    useEffect(() => {
      console.log('stored data use effect')
          //  const storedUserData = sessionStorage.getItem('userData') ? JSON.parse(sessionStorage.getItem('userData') as string) : null;
          const storedBookclubs = sessionStorage.getItem('bookclubs') ? JSON.parse(sessionStorage.getItem('bookclubs') as string) : null
          const storedInvites = sessionStorage.getItem('invitations') ? JSON.parse(sessionStorage.getItem('invitations') as string) : null
          const storedUser = sessionStorage.getItem('activeUser') ? JSON.parse(sessionStorage.getItem('activeUser') as string) : null
          const storedToken = sessionStorage.getItem('authToken') ? JSON.parse(sessionStorage.getItem('authToken') as string) : null
          // const storedBookshelves = sessionStorage.getItem('bookshelves') ? JSON.parse(sessionStorage.getItem('bookshelves') as string) : null
          

          // if (storedBookshelves) {
          //   bookshelfDispatch({type: 'LOAD_BOOKSHELVES', payload: storedBookshelves})
          // }

          if (storedBookclubs) bookclubDispatch({type: 'LOAD_BOOKCLUBS', payload: storedBookclubs})
          if (storedInvites) inviteDispatch({type: 'LOAD_INVITES', payload: storedInvites})
          if (storedUser && storedToken) {

            console.log('userState storage check:', userState)

            userDispatch({type: 'LOGIN_ACTIVE_USER', payload: {user: storedUser, authToken: storedToken }})

          } 

            

          


      
    }, [])


  //   useEffect(() => {

  //     if (!userState.user?.id) {
  //         const storedUser = sessionStorage.getItem('activeUser')
  //         const storedToken = sessionStorage.getItem('authToken')

  //     if (storedUser && storedToken) {
  //         console.log('stored user:', storedUser)
  //         userDispatch({type: 'LOGIN_ACTIVE_USER', payload: {user: JSON.parse(storedUser), authToken: JSON.parse(storedToken)}})
  //        }

  //     }
  // }, [userState.user?.id, userState.authToken])

    // console.log('user context data:', data.data);
    
    // console.log('user context bookclubs:', bookclubs)
    console.log('user context bookshelves:', bookshelves)
    // console.log('user context invitations:', invitations)

    // JSON.stringify(userState), 
    //   JSON.stringify(bookshelves), 
    //   JSON.stringify(bookclubs),
    //   JSON.stringify(invitations), 
    //   JSON.stringify(userTabs)

    const userContextValue = useMemo(() => ({

      userState,
      bookshelves,
      bookclubs,
      invitations,
      userTabs,
      userDispatch,
      bookshelfDispatch,
      bookclubDispatch,
      inviteDispatch,
      tabsDispatch,
      handleLogin

    }), [userState])

      return (

        // pass values into useMemo?
        // REMOVED USERDATA AND SETUSERDATA
        <UserContext.Provider
            value={userContextValue}>

                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider
