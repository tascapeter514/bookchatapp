import {useState, useCallback } from 'react'
import axios from 'axios';



export default function usePut(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    
    // console.log('use post error:', error)
   

    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        console.log('use post check')
        setLoading(true)
        setError('')

        try {
            const response = await axios.put(url, requestData)
            console.log('use put response:', response)
            if (response.status >= 200 && response.status < 300) {
                return response.data  
            } else {
                console.log('unexpected error')
                throw new Error('use post error occurred')
                
            }

        } catch (err: any) {
            console.log('use put catch handler:', err)
            console.log('use put err response:', err.response)
            console.log('err data:', err.response.data)
            setError(err.response?.data?.error || 'An unexpected error occurred')
            // throw err;
            
        } finally {
            setLoading(false)
        }

    }, [url])

    


    return { makeRequest, loading, error}

}