import {createContext, useEffect, useState, Dispatch, SetStateAction, ReactNode, useContext} from 'react'
import { Bookclub, Invitation, Bookshelf } from '../../types'



interface UserContextProps {
    userBookclubs: Bookclub[],
    userInvites: Invitation[],
    userBookshelves: Bookshelf[],
    setUserBookclubs: Dispatch<SetStateAction<Bookclub[]>>,
    setUserInvites: Dispatch<SetStateAction<Invitation[]>>,
    setUserBookshelves: Dispatch<SetStateAction<Bookshelf[]>>
}



interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>({
    userBookclubs: [],
    userInvites: [],
    userBookshelves: [],
    setUserBookclubs: () => [],
    setUserInvites: () => [],
    setUserBookshelves: () => []
});

const UserDataProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {


    const storedUser = localStorage.getItem('currentUser')
    const activeUser = storedUser ? JSON.parse(storedUser) : null;
    const [userBookclubs, setUserBookclubs] = useState<Bookclub[]>([])
    const [userInvites, setUserInvites] = useState<Invitation[]>([])
    const [userBookshelves, setUserBookshelves] = useState<Bookshelf[]>([])

    useEffect(() => {
        const storedBookclubs = sessionStorage.getItem('userBookclubs')
        const storedInvites = sessionStorage.getItem('userInvites')
        const storedBookshelves = sessionStorage.getItem('userBookshelves')

        if (storedBookclubs) {
            setUserBookclubs(JSON.parse(storedBookclubs))
        }

        if (storedInvites) {
            setUserInvites(JSON.parse(storedInvites))
        }

        if (storedBookshelves) {
            setUserBookshelves(JSON.parse(storedBookshelves))
        }



    }, [])



    useEffect(() => {
        if (!activeUser?.id) return
  
        try {
          const socket = new WebSocket(`ws://localhost:8000/ws/userData/${activeUser.id}`)
  
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('user data web socket data:', data)
            console.log('APP ROUTES bookshelves:', data.user_data.user_bookshelves)
            if (data.type === 'get_user_data') {
              sessionStorage.setItem('userBookshelves', JSON.stringify(data.user_data.user_bookshelves))
              sessionStorage.setItem('userBookclubs', JSON.stringify(data.user_data.user_bookclubs))
              sessionStorage.setItem('userInvites', JSON.stringify(data.user_data.user_invites))
  
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
  
  
  
      }, [userBookclubs, userInvites, userBookshelves])

      return (
        <UserContext.Provider
            value={{userBookclubs, userInvites, userBookshelves, setUserBookclubs, setUserInvites, setUserBookshelves}}>

                {children}


        </UserContext.Provider>
      )

}

export const userData = () => useContext(UserContext)

export default UserDataProvider