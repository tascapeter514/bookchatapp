import './Login.css'
import { returnErrors } from '../../messages.tsx'



export default function Login() {


    // REPEATS SIGN UP FORM LOGIC
    function logIn(formData: FormData) {
        const data = Object.fromEntries(formData)
        fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Response', data))
        .catch(err => returnErrors(err.response.data, err.response.status))

    }
    return(
        <div className="login-container">
            <h2>Log In</h2>
            <hr className='hr hr-login'/>
            <form 
                action={logIn as any}
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