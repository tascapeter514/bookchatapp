import { Outlet, Navigate } from 'react-router-dom'
import { userContext } from './Context/UserContext/UserContext'






const AuthRequired = (  ) => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    const activeUserToken = sessionStorage.getItem('authToken')
    const { userState } = userContext()

    console.log('active user token authrequired:', activeUserToken)
    console.log('user state authrequired:', userState)

    const isAuthenticated = activeUserToken ? true : false

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />

    }

}

export default AuthRequired