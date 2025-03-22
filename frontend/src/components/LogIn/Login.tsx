import './Login.css'
import SubHeader from '../common/SubHeader/SubHeader'
import useLogger from '../common/hooks/useLogger'
import { userContext } from '../common/Context/UserContext/UserContext'




const Login = () => {

    const { login, error, loading } = useLogger()

    console.log('log in error:', error)


    return(
        <div className="login-container">
            <SubHeader>Log In</SubHeader>
            <hr className='hr hr-login'/>
            <form 
                action={login as any}
                className='login-form'
                method='post'>
                    {error && <p className='error-message'>{error}</p>}
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