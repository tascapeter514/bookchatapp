import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { ReactNode, useState } from 'react'

interface Props {
    children: ReactNode
}

const PrivateRoute = ({children}: Props) => {
    // Check the authenticated status of the user
    // If they're not authenticated send user to the login page
    // if they are authenticated render the outlet

    const { user } = useSelector((state: RootState) => state.auth)
    const [authToken] = useState<string>(() => {
        const storedToken = localStorage.getItem('authToken')
        return storedToken ? JSON.parse(storedToken) : '';
      })
    
    // console.log('private route authToken:', authToken)
    // console.log('private route user:', user)

    

    

    const isAuthenticated = authToken && user.id ? true : false
    // console.log('is authenticated:', isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } 

    return <>{children}</>

}

export default PrivateRoute