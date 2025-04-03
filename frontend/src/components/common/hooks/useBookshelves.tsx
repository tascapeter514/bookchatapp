import { useReducer, Reducer, useCallback, useEffect, useRef } from "react"
import bookshelfReducer, {BookshelfState, BookshelfAction} from "../../../reducers/bookshelfReducer"
// import axios from "axios"


const useBookshelves = () => {
    console.log('use bookshelves check')

    const [bookshelvesState, bookshelfDispatch] = useReducer<Reducer<BookshelfState, BookshelfAction>>(bookshelfReducer, 
        {data: null, isError: false, error: '', isLoading: false})

    const socketRef = useRef<WebSocket | null>(null)

    

    useEffect(() => {

        console.log('bookshelves use Effect check')

        if (bookshelvesState.data && bookshelvesState.data.length > 0) {
            sessionStorage.setItem('bookshelves', JSON.stringify(bookshelvesState.data))

        }

    }, [bookshelvesState.data])


    const bookshelvesSocket = useCallback( async (url: string) => {
        if (socketRef.current) {
            console.log('close previous bookshelves socket connection')
            socketRef.current.close()
        }



        bookshelfDispatch({'type': 'BOOKSHELVES_FETCH_INIT'})


        try {
            const socket = new WebSocket(url)
            socketRef.current = socket
    
            socket.onmessage = (event) => {
            //   const data = JSON.parse(event.data);
                console.log('use bookshelf data:', JSON.parse(event.data))
                bookshelfDispatch({'type': 'BOOKSHELVES_FETCH_SUCCESS', payload: JSON.parse(event.data)})
                // return JSON.parse(event.data)

            }
    
            socket.onerror = (event) => {
              console.error('Bookshelves socket connection failed:', event)
              bookshelfDispatch({'type': 'BOOKSHELVES_FETCH_FAILURE', payload: 'Error with bookshelves web socket'})
              socket.close();
          }
    
            socket.onopen = () => console.log('Bookshelves websocket connected')
            socket.onclose = () => console.log('Bookshelves websocket disconnected')
    
            return () => socket.close()
    
    
          } catch (err: any) {

            bookshelfDispatch({type: 'BOOKSHELVES_FETCH_FAILURE', payload: err.response?.data?.error || 'An unexpected error with the bookshelf websocket occurred'})

            
          }
        

    }, [bookshelvesState, bookshelfDispatch])

    console.log('use bookshelves hook state:', bookshelvesState)

    return {bookshelvesState, bookshelfDispatch, bookshelvesSocket}


}

export default useBookshelves



// const getBookshelves = useCallback( async (url: string) => {
//     bookshelfDispatch({type: 'BOOKSHELVES_FETCH_INIT'});

//     try {
//         const response = await axios.get(url);

//         if (response.status  >= 200 && response.status < 300 ) {
//             return response.data
//         } else {
//             throw new Error('bookshelf request error')
//         }


//     } catch(err: any) {
//         bookshelfDispatch({type: 'BOOKSHELVES_FETCH_FAILURE', payload: err.response?.data?.error || 'An unexpected error fetching your bookshelves occurred' })

//     }

        

// }, [bookshelvesState.data])