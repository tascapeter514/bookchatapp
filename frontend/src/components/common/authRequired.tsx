import { FC } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
// import { CurrentUser } from '../../types'


interface AuthRequiredProps {
    auth: () => boolean,
}


const AuthRequired: FC<AuthRequiredProps> = ( { auth } ) => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    const isAuthenticated = auth()

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />

    }

}

export default AuthRequired