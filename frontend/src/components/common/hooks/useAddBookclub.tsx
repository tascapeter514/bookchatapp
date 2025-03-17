import {useState, useCallback } from 'react'
import axios from 'axios';



export default function useAddBookclub(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [data, setData] = useState(null)
   

    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        setLoading(true)
        setError(null);

        axios.post(url, requestData)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error('server error')
            }
            console.log(response.data)
            setData(response.data)
            
        })
        .catch((err: Error) => setError(err))
        .finally(() => setLoading(false))
    }, [url])

    return { makeRequest, data, loading, error}

}