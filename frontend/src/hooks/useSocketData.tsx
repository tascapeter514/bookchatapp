import { useCallback, useReducer, useEffect } from 'react'
import { Bookclub, Bookshelf, Invitation } from '../types';


type SocketData = {
  type: string,
  bookclubs: Bookclub[] | null,
  bookshelves: Bookshelf[] | null,
  invitations: Invitation[] | null

}

type SocketState = {

  data: SocketData,
  isLoading: boolean,
  isError: boolean,
  error: string
}

type SocketFetchInitAction = {
  type: 'SOCKET_FETCH_INIT'
}

type SocketFetchSuccessAction = {
  type: 'SOCKET_FETCH_SUCCESS',
  payload: SocketData
}

type SocketFetchFailureAction = {
  type: 'SOCKET_FETCH_FAILURE',
  payload: string
}

type SocketAction = SocketFetchInitAction |  SocketFetchSuccessAction | SocketFetchFailureAction

const socketReducer = (state: SocketState, action: SocketAction) => {
      switch(action.type) {
        case 'SOCKET_FETCH_INIT':
          return {
            ...state,
            isLoading: true,
          }
        
        case 'SOCKET_FETCH_SUCCESS':
          return {
            ...state,
            isLoading: false,
            data: action.payload
          }

        case 'SOCKET_FETCH_FAILURE':
          return {
            ...state,
            isLoading: false,
            isError: true,
            error: action.payload
          }

        default:
          throw new Error

      }
}



export default function useSocketData(url: string) {

    const [socketState, dispatchSocket] = useReducer(socketReducer, {
      data: {
        type: '',
        bookclubs: null,
        bookshelves: null,
        invitations: null,
      },
      isLoading: false,
      isError: false,
      error: ''

    })




    const connectSocket = useCallback( async (id: number) => {

        dispatchSocket({type: 'SOCKET_FETCH_INIT'})
        try {
            const socket = new WebSocket(`${url}/${id}`)
    
            socket.onmessage = (event) => {
            //   const data = JSON.parse(event.data);
                console.log('use socket data:', JSON.parse(event.data))
                dispatchSocket({type: 'SOCKET_FETCH_SUCCESS', payload: JSON.parse(event.data) })
            }
    
            socket.onerror = (event) => {
              console.error('WebSocket connection failed:', event)
              dispatchSocket({type: 'SOCKET_FETCH_FAILURE', payload: 'User Data websocket failed to connect'})
              socket.close();
          }
    
            socket.onopen = () => console.log('User data websocket connected')
            socket.onclose = () => console.log('User data websocket disconnected')
    
            return () => socket.close()
    
    
          } catch (err: any) {
            dispatchSocket({type: 'SOCKET_FETCH_FAILURE', payload: 'User data websocket failure'})
            
          }
        

    }, [])


    
    return {socketState, connectSocket}
    

}