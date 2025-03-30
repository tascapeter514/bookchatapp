import {createContext, useEffect, Dispatch, ReactNode, useContext, useReducer, Reducer} from 'react'
import userReducer, {UserState, UserAction} from '../../../../reducers/userReducer.tsx'
import { Data } from '../../../../reducers/dataReducer.tsx';
import bookshelfReducer, {BookshelfState, BookshelfAction} from '../../../../reducers/bookshelfReducer.tsx';
import bookclubReducer, {BookclubState, BookclubAction} from '../../../../reducers/bookclubReducer.tsx';
import inviteReducer, {InviteState, InviteAction} from '../../../../reducers/inviteReducer.tsx';
import userTabsReducer, {TabAction, TabState} from '../../../../reducers/userTabsReducer.tsx';
import useSocket from '../../hooks/useSocket.tsx';

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
  tabsDispatch: Dispatch<TabAction> 

}

interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>({
    
    userState: {user: null, authToken: '', isLoggedIn: false, isLoading: false, isError: false, error: ''},
    bookshelves: {data: []},
    bookclubs: {data: []},
    invitations: { data: []},
    userTabs: {activeTab: '', activeBookshelf: ''},
    userDispatch: () => {},
    bookshelfDispatch: () => {},
    bookclubDispatch: () => {},
    inviteDispatch: () => {},
    tabsDispatch: () => {},

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
    const [bookshelves, bookshelfDispatch] = useReducer<Reducer<BookshelfState, BookshelfAction>>(bookshelfReducer, {data: []})
    const [bookclubs, bookclubDispatch] = useReducer<Reducer<BookclubState, BookclubAction>>(bookclubReducer, {data: []})
    const [invitations, inviteDispatch] = useReducer<Reducer<InviteState, InviteAction>>(inviteReducer, {data: []})
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
        console.log('user context incoming data:', data.data)
        bookshelfDispatch({type: 'LOAD_BOOKSHELVES', payload: data.data.user_data.find((result: Data) => result.type === 'bookshelf').items})
        bookclubDispatch({type: 'LOAD_BOOKCLUBS', payload: data.data.user_data.find((result: Data) => result.type === 'bookclub').items})
        inviteDispatch({type: 'LOAD_INVITES', payload: data.data.user_data.find((result: Data) => result.type === 'invite').items})
        sessionStorage.setItem('userData', JSON.stringify(data.data.user_data))
      }

    }, [data.data])




    useEffect(() => {
           const storedUserData = JSON.parse(sessionStorage.getItem('userData') ?? '');
           if (storedUserData) {
            // setUserData(JSON.parse(storedUserData))
            console.log('stored user data:', storedUserData)
            bookshelfDispatch({type: 'LOAD_BOOKSHELVES', payload: storedUserData.find((result: Data) => result.type === 'bookshelf').items})
            bookclubDispatch({type: 'LOAD_BOOKCLUBS', payload: storedUserData.find((result: Data) => result.type === 'bookclub').items})
            inviteDispatch({type: 'LOAD_INVITES', payload: storedUserData.find((result: Data) => result.type === 'invite').items})
            

           }
      
    }, [])

    console.log('user context bookclubs:', bookclubs)

      return (

        // pass values into useMemo?
        // REMOVED USERDATA AND SETUSERDATA
        <UserContext.Provider
            value={{userState,
                   bookshelves,
                   bookclubs,
                   invitations,
                   userTabs,
                    userDispatch,
                    bookshelfDispatch,
                    bookclubDispatch,
                    inviteDispatch,
                    tabsDispatch,
                  }}>

                {children}
        </UserContext.Provider>
      )

}

export const userContext = () => useContext(UserContext)

export default UserDataProvider
