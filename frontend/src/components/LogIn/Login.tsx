import './Login.css'
import SubHeader from '../common/SubHeader/SubHeader'
import { userContext } from '../common/Context/UserContext/UserContext'
import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage'





const Login = () => {


    const {handleLogin, error, loading } = userContext()



    return(
        <div className="login-container">
            <SubHeader>Log In</SubHeader>
            <hr className='hr hr-login'/>
            <form 
                action={handleLogin as any}
                className='login-form'
                method='post'>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {loading && <p className='loading'>Loading....</p>}
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