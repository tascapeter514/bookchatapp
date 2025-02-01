import './Login.css'



export default function Login() {
    return(
        <div className="login-container">
            <h2>Log In</h2>
            <hr className='hr hr-login'/>
            <form 
                action=""
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
                        name='userPassword-login'
                        required />
                    <button className="btn btn-login">Log In</button>
                       
                </form>
            </div>

    )
}