import { useCallback, useReducer, Reducer } from 'react'
import dataReducer, {DataState, DataAction} from '../../../reducers/dataReducer'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { axiosErrorHandler } from '../../../messages'

export default function useLogger() {


    const navigate = useNavigate()
    const [logInDataState, dispatchLogin] = useReducer<Reducer<DataState, DataAction>>(dataReducer,{
        data: [], isError: false, isLoading: false, error: ''
    })
    
  

    const authenticate = useCallback( async (url: string, formData: FormData) => {
        
        dispatchLogin({type: 'DATA_FETCH_INIT'})
        const data = Object.fromEntries(formData);

        try {
            const response = await axios.post(url, data)

            console.log('user logger response:', response)

        
            if (response.status >= 200 && response.status < 300 && response.data.auth_token) {

                console.log('response:', response.data)

                // const {active_user, auth_token} = response.data;
                dispatchLogin({type: 'DATA_FETCH_SUCCESS', payload: response.data})
                // sessionStorage.setItem('authToken', JSON.stringify(auth_token))
                // sessionStorage.setItem('activeUser', JSON.stringify(active_user))
                navigate('/userDashboard')
                

            } else if (response.status >= 200 && response.status < 300 && !response.data.auth_token) {
                dispatchLogin({type: 'DATA_FETCH_FAILURE', payload: 'Login Successful but no auth token'})
                sessionStorage.removeItem('authToken')
                sessionStorage.removeItem('activeUser')
                navigate('/login')

            } else {
                console.log('unexpected response')
                dispatchLogin({type: 'DATA_FETCH_FAILURE', payload: 'Unexpected response while logging in'})
            }

        } catch(err: any) {
            console.log("type of error:", err instanceof AxiosError)
            console.log("catch handler:", err)
            err instanceof AxiosError 
            ? dispatchLogin({type: 'DATA_FETCH_FAILURE', payload: axiosErrorHandler(err)})
            : dispatchLogin({type: 'DATA_FETCH_FAILURE', payload: err})

        }

    }, [])
    

    // useEffect(() => {

    //     if (!userState.user?.id) {
    //         const storedUser = sessionStorage.getItem('activeUser')
    //         const storedToken = sessionStorage.getItem('authToken')
  
    //     // if (storedUser && storedToken) {
    //     //     console.log('stored user:', storedUser)
    //     //     userDispatch({type: 'LOGIN_ACTIVE_USER', payload: {user: JSON.parse(storedUser), authToken: JSON.parse(storedToken)}})
    //     //    }

    //     }
    // }, [userState.user?.id, userState.authToken])

   
    return {logInDataState, authenticate}

}
