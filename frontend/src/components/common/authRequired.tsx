import { FC } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { userData } from './UserContext'





const AuthRequired: FC = (  ) => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    // const { activeUserToken } = userData()
    const activeUserToken = sessionStorage.getItem('authToken')
    console.log('auth required active user token:', activeUserToken)

    const isAuthenticated = activeUserToken ? true : false

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />

    }

}

export default AuthRequired