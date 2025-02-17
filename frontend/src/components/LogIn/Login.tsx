import './Login.css'
import { FC } from 'react'
import { HandleLogin } from '../../types'


interface LoginProps {
    login: HandleLogin,
}

const Login: FC<LoginProps> = ({login}) => {


    return(
        <div className="login-container">
            <h2>Log In</h2>
            <hr className='hr hr-login'/>
            <form 
                action={login as any}
                className='login-form'
                method='post'>
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