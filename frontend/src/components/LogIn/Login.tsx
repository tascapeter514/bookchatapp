import './Login.css'
import SubHeader from '../SubHeader/SubHeader'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../slices/authApiSlice'
import { setCredentials } from '../../slices/authSlice'
import { handleLoginError, LoginError } from '../../utils/errorHandling'





const Login = () => {
    console.log('login rendered')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, {isLoading, isError, error}] = useLoginMutation()

    const handleLogin = async (formData: FormData) => {
        
        const username = formData.get('username')
        const password = formData.get('password')


        try {
            const response = await login({ username, password }).unwrap()
            console.log('login response:', response)

            dispatch(setCredentials({...response}))
            navigate('/userDashboard')


        } catch (err: any) {
            console.log(err?.data?.message || err?.error)

        }

    }

    console.log('login error:', error)

    

    return(
        <div className="login-container">
            <SubHeader>Log In</SubHeader>
            <hr className='hr hr-login'/>
            <form 
                action={handleLogin as any}
                className='login-form'
                method='post'>
                    {/* REFACTOR WITH ERROR */}
                    {isError && <ErrorMessage>{handleLoginError(error as LoginError)}</ErrorMessage>}
                    {isLoading && <p className='loading'>Loading....</p>}
                    <label htmlFor="username-login">Username: </label>
                    <input 
                        type="text" 
                        id='username-login'
                        placeholder='samJohnson514'
                        name='username'
                        required />
                    <label htmlFor="userPassword-login"></label>
                    <input 
                        type="password"
                        id='userPassword-login'
                        placeholder='Enter your password'
                        name='password'
                        required />
                    <button className="btn btn-login">Log In</button>
                       
                </form>
            </div>


    )
}

export default Login