import { useState, useCallback } from 'react'
import axios from 'axios'


export default function useGetData(url: string) {

    console.log('url:', url)
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const makeRequest = useCallback( async () => {

        setLoading(true)


        try {
            const response = await axios.get(url)

            if (response.status >= 400) {
                throw new Error('server error')
            }
            return response.data

        } catch(err: any) {

            setError(err)

        } finally {
            setLoading(false)
        }
    }, [])


    return { makeRequest, loading, error}
}