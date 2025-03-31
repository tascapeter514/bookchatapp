import { useCallback, useReducer, Reducer } from 'react'
import dataReducer, {DataAction, DataState} from '../../../reducers/dataReducer'
import axios from 'axios'


const useDelete = (url: string) => {
    const [data, dispatchData] = useReducer<Reducer<DataState, DataAction>>(
        dataReducer, {data: [], isError: false, isLoading: false, error: ''})


    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        dispatchData({type: 'DATA_FETCH_INIT'})

        try {


            const response = await axios.delete(url, requestData)

            if (response.status >= 200 && response.status < 300) {
                dispatchData({type: 'DATA_FETCH_SUCCESS', payload: response.data})
            } else {
                console.log('unexpected error with your delete operation')
                throw new Error('use delete error occurred')
            }

        } catch (err: any) {
            dispatchData({type: 'DATA_FETCH_FAILURE', payload: err.response?.data?.error || 'An unexpected error occurred with your delete request'})
            // THROW ERROR?
            throw err
        }



        }, [url])

        return { data, makeRequest}

}

export default useDelete

