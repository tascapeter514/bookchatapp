import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation, useLogoutMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'


const useAuth = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, error }] = useLoginMutation();
    const [logout] = useLogoutMutation()

    const { user, authToken } = useSelector((state: RootState)  => state.auth)
    console.log('use auth hook user:', user)
    console.log('use auth hook user:', authToken)

    useEffect(() => {

        if (!user && !authToken) {
            return
        } else {
            navigate('/userDashboard')
        }

        
    }, [navigate, user, authToken])

    return { dispatch, login, logout, isLoading, error }

}

export default useAuth



