import {useState, useCallback } from 'react'
import axios from 'axios';



export default function usePost(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')

    
    // console.log('use post error:', error)
   

    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        console.log('use post check')
        setLoading(true)
        setError('')

        try {

            const response = await axios.post(url, requestData)
            console.log('use post response:', response)
            if (response.status >= 200 && response.status < 300) {
                return response.data  
            } else {
                console.log('unexpected error')
                throw new Error('use post error occurred')
                
            }

        } catch (err: any) {
            console.log('use post catch handler:', err)
            setError(err.response?.data?.error || 'An unexpected error occurred')
            throw err;
            
        } finally {
            setLoading(false)
        }

        
        
       
    }, [url])

    


    return { makeRequest, loading, error}

}