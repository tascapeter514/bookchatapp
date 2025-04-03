import {createContext, useEffect, useReducer, ReactNode, useMemo} from 'react'
import userReducer from '../../reducers/userReducer'


interface Props {
    children: ReactNode
}



const INITIAL_STATE = {
    user: JSON.parse(sessionStorage.getItem('user') as string)|| null,
    authToken: JSON.parse(sessionStorage.getItem('authToken') || '') ,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    error: ''

}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}: Props) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])
    
    


    const contextValues = useMemo(() => ({

        user: state.user,
        authToken: state.authToken,
        isLoggedIn: state.isLoggedIn,
        isLoading: state.isLoading,
        isError: state.isError,
        error: state.error,
        dispatch



    }), [])


    return (
        <AuthContext.Provider
            value={contextValues}
        
        >
    
            {children}
    
        </AuthContext.Provider>
    )

}




    



