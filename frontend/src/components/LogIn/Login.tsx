import './Login.css'
import SubHeader from '../SubHeader/SubHeader'
import { useContext } from 'react'
import useLogger from '../../hooks/useLogger'
import { AuthContext } from '../../context/authContext/authContext'

import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage'






const Login = () => {

    const {isError, isLoading, error, dispatch} = useContext(AuthContext)
    const {authenticate} = useLogger(dispatch)
    const handleLogin = async (formData: FormData) => await authenticate('http://localhost:8000/api/auth/login', formData)

    

    return(
        <div className="login-container">
            <SubHeader>Log In</SubHeader>
            <hr className='hr hr-login'/>
            <form 
                action={handleLogin as any}
                className='login-form'
                method='post'>
                    {isError && <ErrorMessage>{error}</ErrorMessage>}
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