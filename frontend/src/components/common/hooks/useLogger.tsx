import { useState, useCallback, useEffect, useReducer, Reducer } from 'react'
import userReducer, {UserState, UserAction} from '../../../reducers/userReducer'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { axiosErrorHandler } from '../../../messages'



// export type UserState = {
//     user: ActiveUser,
//     authToken: AuthToken,
//     isLoggedIn: boolean,
//     isLoading: boolean,
//     isError: boolean

// }

export default function useLogger() {

    
    const navigate = useNavigate()
    const [userState, userDispatch] = useReducer<Reducer<UserState, UserAction>>(userReducer, {
        user: {
            id: 0,
            password: '',
            username: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            dateJoined: '',
            profile: {
                bio: '',
                profilePic: undefined

            }
        },
        authToken: '',
        isLoggedIn: false,
        isLoading: false,
        isError: false,
        error: ''
    })
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState<string>('')
    // const [authToken, setAuthToken ] = useState<AuthToken>('')
    // const [activeUser, setActiveUser] = useState<ActiveUser>({
    //     id: NaN,
    //     password: '',
    //     username: '',
    //     first_name: '',
    //     last_name: '',
    //     email: '',
    //     date_joined: '',
    //     profile: {
    //         bio: '',
    //         profile_pic: undefined
    //     }
    // })

    const authenticate = useCallback( async (url: string, formData: FormData) => {
        userDispatch({type: 'USER_FETCH_INIT'})
        // CLEAR THE ERROR HANDLER AFTER EACH REQUEST
        // setError('')

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
            // setActiveUser(JSON.parse(storedUser))
           }
        //    if (storedToken) {
        //     setAuthToken(JSON.parse(storedToken))
        //    }

        }
    }, [userState.user?.id, userState.authToken])

   


    // TEMPORARILY PASS SETAUTHTOKEN TO USER CONTEXT
    return {userState, userDispatch, authenticate}

}
