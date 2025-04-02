import { useReducer, Reducer, useCallback } from "react"
import bookshelfReducer, {BookshelfState, BookshelfAction} from "../../../reducers/bookshelfReducer"
import useSocketData from "./useSocketData"


const useBookshelves = () => {


    const [bookshelves, bookshelfDispatch] = useReducer<Reducer<BookshelfState, BookshelfAction>>(bookshelfReducer, 
        {data: null, isError: false, error: '', isLoaded: false})

    
    const makeRequest = useCallback( async (url: string) => {

    }, [])



    const connectSocket = useCallback( async (url: string) => {


        try {
            const socket = new WebSocket(url)
    
            socket.onmessage = (event) => {
            //   const data = JSON.parse(event.data);
                console.log('use socket data:', JSON.parse(event.data))

            }
    
            socket.onerror = (event) => {
              console.error('WebSocket connection failed:', event)
              socket.close();
          }
    
            socket.onopen = () => console.log('User data websocket connected')
            socket.onclose = () => console.log('User data websocket disconnected')
    
            return () => socket.close()
    
    
          } catch (err: any) {

            
          }
        

    }, [])

}

export default useBookshelves