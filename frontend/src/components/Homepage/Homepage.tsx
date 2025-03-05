import {useState, useEffect } from 'react';
import BookSlider from '../common/BookSlider/BookSlider'
import './Homepage.css'
import { Book } from '../../types';

export default function Homepage() {

   

    const [bestsellers, setBestsellers] = useState<Book[]>([])


    useEffect(() => {
        fetch('http://localhost:8000/')
        .then(res => res.json())
        .then(data => setBestsellers(data))
    }, [])

  
    

  

    function register(formData: FormData) {
        const data = Object.fromEntries(formData)
        console.log('data:', data)
        
        
        fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
        .then(response => response.json())
        .then(data => console.log('Response:', data))
        .catch(error => console.error('Error:', error)); 

        // console.log('form data:', formData)
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
                action={register as any}
                method='post'>
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