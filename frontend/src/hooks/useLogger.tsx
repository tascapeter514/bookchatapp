import { useCallback, Dispatch } from 'react'
import {UserAction} from '../reducers/userReducer'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { axiosErrorHandler } from '../messages'


export default function useLogger(dispatch: Dispatch<UserAction>) {


    const navigate = useNavigate()
    
    const authenticate = useCallback( async (url: string, formData: FormData) => {
        
        dispatch({type: 'USER_FETCH_INIT'})
        const data = Object.fromEntries(formData);

        try {
            const response = await axios.post(url, data)

            console.log('user logger response:', response)

        
            if (response.status >= 200 && response.status < 300 && response.data.auth_token) {

                console.log('response:', response.data)

                const {active_user, auth_token} = response.data
                dispatch({type: 'LOGIN_ACTIVE_USER', payload: {user: active_user, authToken: auth_token }})
                
                

            } else if (response.status >= 200 && response.status < 300 && !response.data.auth_token) {
                dispatch({type: 'USER_ERROR', payload: 'Login Successful but no auth token'})
                sessionStorage.removeItem('authToken')
                sessionStorage.removeItem('activeUser')
                navigate('/login')

            } else {
                console.log('unexpected response')
                dispatch({type: 'USER_ERROR', payload: 'Unexpected response while logging in'})
            }

        } catch(err: any) {
            console.log("type of error:", err instanceof AxiosError)
            console.log("catch handler:", err)
            err instanceof AxiosError 
            ? dispatch({type: 'USER_ERROR', payload: axiosErrorHandler(err)})
            : dispatch({type: 'USER_ERROR', payload: err})

        }

    }, [navigate])


    
    return {authenticate}

}
