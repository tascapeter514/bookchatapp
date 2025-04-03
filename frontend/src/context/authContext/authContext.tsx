import {createContext, useEffect, useReducer, ReactNode, useMemo, Dispatch} from 'react'
import { AuthState } from '../../types'
import userReducer, {UserAction} from '../../reducers/userReducer'





interface AuthContextType extends AuthState {
    dispatch: Dispatch<UserAction> | undefined
}

interface Props {
    children: ReactNode
}



const INITIAL_STATE: AuthState = {
    user: JSON.parse(sessionStorage.getItem('user') as string) || null,
    authToken: JSON.parse(sessionStorage.getItem('authToken') as string) || null ,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    error: ''

}


export const AuthContext = createContext<AuthContextType>({...INITIAL_STATE, dispatch: undefined as Dispatch<UserAction> | undefined})

export const AuthContextProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);


    console.log('auth context dispatch:', dispatch)



    console.log('auth context logged in:', state.isLoggedIn)
    console.log('auth context token:', state.authToken)

    useEffect(() => {

        sessionStorage.setItem('user', JSON.stringify(state.user))
        sessionStorage.setItem('authToken', JSON.stringify(state.authToken))

    }, [state.user, state.authToken])
    

    const contextValues = useMemo(
        () => ({
            user: state.user,
            authToken: state.authToken,
            isLoggedIn: state.isLoggedIn,
            isLoading: state.isLoading,
            isError: state.isError,
            error: state.error,
            dispatch, // Now dispatch is correctly passed
        }),
        [state, dispatch] // Re-run when state or dispatch changes
    );


    return (
        <AuthContext.Provider
            value={contextValues}
        
        >
    
            {children}
    
        </AuthContext.Provider>
    )

}




    



