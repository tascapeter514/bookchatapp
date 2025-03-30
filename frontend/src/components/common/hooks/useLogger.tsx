import { useCallback, useEffect } from 'react'
import { userContext } from '../Context/UserContext/UserContext'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { axiosErrorHandler } from '../../../messages'

export default function useLogger() {


    const navigate = useNavigate()
    const {userState, userDispatch} = userContext()
    
  

    const authenticate = useCallback( async (url: string, formData: FormData) => {
        
        userDispatch({type: 'USER_FETCH_INIT'})
        const data = Object.fromEntries(formData);

        try {
            const response = await axios.post(url, data)

            console.log('user logger response:', response)

        
            if (response.status >= 200 && response.status < 300 && response.data.auth_token) {

                console.log('response:', response.data)

                const {active_user, auth_token} = response.data;
                userDispatch({type: 'LOGIN_ACTIVE_USER', payload: {user: active_user, authToken: auth_token }})
                sessionStorage.setItem('authToken', JSON.stringify(auth_token))
                sessionStorage.setItem('activeUser', JSON.stringify(active_user))
                navigate('/userDashboard')
                

            } else {
                console.log('unexpected response')
                userDispatch({'type': 'USER_ERROR', payload: 'Unexpected server response'})
            }

        } catch(err: any) {
            console.log("type of error:", err instanceof AxiosError)
            console.log("catch handler:", err)
            err instanceof AxiosError 
            ? userDispatch({type: 'USER_ERROR', payload: axiosErrorHandler(err)})
            : userDispatch({type: 'USER_ERROR', payload: err})

        }

    }, [])

    useEffect(() => {

        if (!userState.user?.id) {
            const storedUser = sessionStorage.getItem('activeUser')
            const storedToken = sessionStorage.getItem('authToken')
  
        if (storedUser && storedToken) {
            console.log('stored user:', storedUser)
            userDispatch({type: 'LOGIN_ACTIVE_USER', payload: {user: JSON.parse(storedUser), authToken: JSON.parse(storedToken)}})
           }

        }
    }, [userState.user?.id, userState.authToken])

   
    return {userState, userDispatch, authenticate}

}
