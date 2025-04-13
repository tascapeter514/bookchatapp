import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useState } from 'react'






const PrivateRoute = (  ) => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    const { user } = useSelector((state: RootState) => state.auth)
    const [authToken] = useState<string>(() => {
        const storedToken = sessionStorage.getItem('authToken')
        return storedToken ? JSON.parse(storedToken) : '';
      })
    
    console.log('auth required authToken:', authToken)

    

    const isAuthenticated = authToken && user.id ? true : false
    console.log('is authenticated:', isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />

    }

}

export default PrivateRoute