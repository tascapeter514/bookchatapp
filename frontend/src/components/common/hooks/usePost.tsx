import {useState, useCallback } from 'react'
import axios from 'axios';



export default function usePost(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    
   

    const makeRequest = useCallback(
        async <T extends object> (requestData: T) => {
        console.log('use post check')
        setLoading(true)

        try {

            const response = await axios.post(url, requestData)
            if (response.status === 200) {
                return response.data  
            } else {
                console.log('unexpected error')
                setError('Unexpected server error')
            }

        } catch (err: any) {
            console.log('use post catch handler:', err)
            setError(err)
            
        } finally {
            setLoading(false)
        }

        
        
       
    }, [url])

    console.log('use post error:', error)


    return { makeRequest, loading, error}

}