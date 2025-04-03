import { useCallback, useReducer, Reducer } from 'react'
import dataReducer, {DataState, DataAction} from '../reducers/dataReducer'
import axios from 'axios'


export default function useGet() {

    
    const [data, dispatchData] = useReducer<Reducer<DataState, DataAction>>(dataReducer,
        {data: [], isLoading: false, isError: false, error: ''})


    const makeRequest = useCallback( async (url: string) => {
        console.log('make request check')
        dispatchData({type: 'DATA_FETCH_INIT'})


        try {
            const response = await axios.get(url)
            console.log('get response data:', response.data)

            if (response.status >= 200 && response.status < 300) {
                dispatchData({type: 'DATA_FETCH_SUCCESS', payload: response.data})

            } else {
                throw new Error('server error')
            }

        } catch(err: any) {

            dispatchData({type: 'DATA_FETCH_FAILURE', payload: err.response?.data?.error || 'An unexpected error occurred' })

        }
    }, [])


    return { data, makeRequest }
}