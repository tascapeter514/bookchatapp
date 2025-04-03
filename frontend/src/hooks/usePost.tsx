import { useCallback, useReducer, Reducer } from 'react'
import dataReducer, {DataAction, DataState} from '../reducers/dataReducer';
import axios from 'axios';



export default function usePost(url: string) {

    const [data, dispatchData] = useReducer<Reducer<DataState, DataAction>>(dataReducer, 
            {data: [], isError: false, isLoading: false, error: ''})

   

    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        console.log('use post check')
        dispatchData({type: 'DATA_FETCH_INIT'})

        try {

            const response = await axios.post(url, requestData)
            console.log('use post response:', response)

            if (response.status >= 200 && response.status < 300) {
                dispatchData({type: 'DATA_FETCH_SUCCESS', payload: response.data})

            } else {
                console.log('unexpected error')
                throw new Error('use post error occurred')
                
            }

        } catch (err: any) {
            console.log('use post catch handler:', err)
            dispatchData({type: 'DATA_FETCH_FAILURE', payload: err.response?.data?.error || 'An unexpected error occurred'})
            throw err;
            
        } 

        
        
       
    }, [url])

    // console.log('use post data:', data)

    


    return { data, makeRequest}

}