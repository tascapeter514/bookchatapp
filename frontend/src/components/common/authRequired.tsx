import { Outlet, Navigate } from 'react-router-dom'






const AuthRequired = (  ) => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    const activeUserToken = sessionStorage.getItem('authToken')

    const isAuthenticated = activeUserToken ? true : false

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />

    }

}

export default AuthRequired