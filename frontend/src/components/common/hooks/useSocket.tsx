import { useCallback, useReducer, Reducer } from 'react'
import dataReducer, {DataAction, DataState} from '../../../reducers/dataReducer';


export default function useSocket(url: string) {

    const [data, dispatchData] = useReducer<Reducer<DataState, DataAction>>(dataReducer,
         {data: [], isLoading: false, isError: false, error: ''} )


    const makeRequest = useCallback( async (id: number) => {

        dispatchData({type: 'DATA_FETCH_INIT'})
        try {
            const socket = new WebSocket(`${url}/${id}`)
    
            socket.onmessage = (event) => {
            //   const data = JSON.parse(event.data);
                console.log('use socket data:', JSON.parse(event.data))
                dispatchData({type: 'DATA_FETCH_SUCCESS', payload: JSON.parse(event.data)})
            }
    
            socket.onerror = (event) => {
              console.error('WebSocket connection failed:', event)
            //   setError(new Error('Search websocket failed to connect'))
              dispatchData({type: 'DATA_FETCH_FAILURE', payload: 'Search websocket failed to connect'})
              socket.close();
          }
    
            socket.onopen = () => console.log('User data websocket connected')
            socket.onclose = () => console.log('User data websocket disconnected')
    
            return () => socket.close()
    
    
          } catch (err: any) {
            dispatchData({type: 'DATA_FETCH_FAILURE', payload: 'Search websocket failure'})
            
          }
        

    }, [])

    console.log('use socket data:', data)
    

    return {data, makeRequest}

}