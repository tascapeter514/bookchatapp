import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { userContext } from '../context/UserContext/UserContext'






const AuthRequired = (  ) => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    const [authToken] = useState<string>(() => {
        const storedToken = sessionStorage.getItem('authToken')
        return storedToken ? JSON.parse(storedToken) : '';
      })
    
    console.log('auth required authToken:', authToken)

    const isAuthenticated = authToken ? true : false
    console.log('is authenticated:', isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />

    }

}

export default AuthRequired