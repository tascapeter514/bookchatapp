import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'


const useAuth = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, error }] = useLoginMutation();

    const { userInfo } = useSelector((state: RootState)  => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/userDashboard')
        }
    }, [navigate, userInfo])

    return { dispatch, login, isLoading, error }

}

export default useAuth



