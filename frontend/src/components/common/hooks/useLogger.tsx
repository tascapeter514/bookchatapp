import { useState, useCallback, useEffect } from 'react'
import { ActiveUser, AuthToken } from '../../../types'
import axios, { AxiosError } from 'axios'

import { axiosErrorHandler } from '../../../messages'


export default function useLogger(url: string) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const [authToken, setAuthToken ] = useState<AuthToken>('')
    const [activeUser, setActiveUser] = useState<ActiveUser>({
        id: NaN,
        password: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        date_joined: '',
        profile: {
            bio: '',
            profile_pic: undefined
        }
    })



    const login = useCallback( async (formData: FormData) => {
        setLoading(true)

        const data = Object.fromEntries(formData);

        try {
            const response = await axios.post(url, data)

            console.log('user logger response:', response)

        
            if (response.status >= 200 && response.status < 300 && response.data.auth_token) {

                console.log('response:', response.data)

                const {active_user, auth_token} = response.data;
                setActiveUser(active_user)
                setAuthToken(auth_token)
                sessionStorage.setItem('authToken', JSON.stringify(auth_token))
                sessionStorage.setItem('activeUser', JSON.stringify(activeUser))
                

            } else {
                console.log('unexpected response')
                setError('Unexpected server response')
            }

        } catch(err: any) {
            console.log("type of error:", err instanceof AxiosError)
            console.log("catch handler:", err)
            err instanceof AxiosError ? setError(axiosErrorHandler(err)) : setError(err)

        } finally {
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        const storedUser = sessionStorage.getItem('currentUser')
        const storedToken = sessionStorage.getItem('authToken')

        if (storedUser) {
            setActiveUser(JSON.parse(storedUser))
           }
           if (storedToken) {
            setAuthToken(JSON.parse(storedToken))
           }

    }, [])

    return {activeUser, authToken, setActiveUser, login, loading, error}

}


 // console.log('log in response:', response.data)
            // const {active_user, auth_token} = response.data;
            // console.log('active user data:', active_user)
            // console.log('auth token:', auth_token)
            // setActiveUser(active_user)
            // setAuthToken(auth_token)