import { FC } from 'react'
import { Outlet } from 'react-router-dom'





const AuthRequired: FC = () => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    
    

    return <Outlet />

}

export default AuthRequired