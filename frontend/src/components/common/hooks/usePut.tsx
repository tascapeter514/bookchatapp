import { useCallback, useReducer, Reducer } from 'react'
import dataReducer, {DataState, DataAction} from '../../../reducers/dataReducer';
import axios from 'axios';



export default function usePut(url: string) {


    const [data, dispatchData] = useReducer<Reducer<DataState, DataAction>>(dataReducer,
        {data: {type: ''}, isLoading: false, isError: false, error: ''})

   

    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        console.log('use post check')
        dispatchData({type: 'DATA_FETCH_INIT'})

        try {
            const response = await axios.put(url, requestData)
            console.log('use put response:', response)
            if (response.status >= 200 && response.status < 300) {
                dispatchData({type: 'DATA_FETCH_SUCCESS', payload: response.data})
            } else {
                console.log('unexpected error')
                throw new Error('use post error occurred')
                
            }

        } catch (err: any) {
            console.log('use put catch handler:', err)
            console.log('use put err response:', err.response)
            console.log('err data:', err.response.data)
            dispatchData({type: 'DATA_FETCH_FAILURE', payload: err.response?.data?.error || 'An unexpected error occurred' })
            // throw err;
            
        } 

    }, [url])

    


    return { data, makeRequest}

}