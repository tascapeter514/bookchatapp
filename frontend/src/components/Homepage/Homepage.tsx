import {useState, useEffect } from 'react';
import BookSlider from '../common/BookSlider/BookSlider'
import useLogger from '../common/hooks/useLogger';
import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom'
import './Homepage.css'
import { Book } from '../../types';

export default function Homepage() {

   
    const navigate = useNavigate()
    const [bestsellers, setBestsellers] = useState<Book[]>([])
    const {login, loading, error } = useLogger('http://localhost:8000/api/auth/register')


    useEffect(() => {
        fetch('http://localhost:8000/')
        .then(res => res.json())
        .then(data => setBestsellers(data))
    }, [])


    const handleRegister = async (formData: FormData) => {

        try {
            await login(formData)
            navigate('/userDashboard')
        } catch(err) {
            console.error('Unexpected error with handle login')
        }

    }





    return(
      <div className="book-container">
        <h3>Bestsellers</h3>
        <BookSlider books={bestsellers}></BookSlider>

        <div className="homepage-main-content">
            <h2>Create a Book Club with your Friends!</h2>
            <p className='subtitle subtitle-signup'>Register today!</p>
            <hr className='hr hr-signup'/>
            <form className='email-collector' 
                action={handleRegister as any}
                method='post'
            >
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <label htmlFor="userName">Username: </label>
                <input 
                    type="text" 
                    id='username' 
                    placeholder='samJohnson514' 
                    name='username' 
 
                    required/>
                <label htmlFor="userPassword">Password: </label>
                <input 
                    type="password" 
                    id='password' 
                    placeholder='Enter your password' 
                    name='password' 
                    required/>
                <button className='btn btn-signup' type='submit'>Register</button>
            </form>
        </div>

        



      </div>
    )
}