import { useState, useCallback } from 'react'
import axios, { AxiosError } from 'axios'
import { axiosErrorHandler } from '../../../messages'


export default function useLogger() {

    const [activeUser, setActiveUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = useCallback( async (formData: FormData) => {
        setLoading(true)

        const data = Object.fromEntries(formData);

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', data)


            if (response.status >= 400 && !response.data.token) {
                console.log('login response status:', response.statusText)
                throw new Error('server error')
            }

            console.log('log in response:', response.data)



        } catch(err: any) {
            console.log("type of error:", err instanceof AxiosError)
            console.log("catch handler:", err)
            err instanceof AxiosError ? setError(axiosErrorHandler(err)) : setError(err)

        } finally {
            setLoading(false)
        }

    }, [])

    return {activeUser, login, loading, error}

}