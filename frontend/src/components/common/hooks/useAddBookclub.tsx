import {useState, useCallback } from 'react'
import axios from 'axios';



export default function useAddBookclub(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
   

    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        setLoading(true)
        setError(null);

        try {

            const response = await axios.post(url, requestData)

            if (response.status >= 400) {
                throw new Error('server error')
            }

            return response.data

        } catch (err: any) {
            setError(err)
            
        } finally {
            setLoading(false)
        }

        
        
       
    }, [url])


    return { makeRequest, loading, error}

}