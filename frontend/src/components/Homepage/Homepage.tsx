import {useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import './Homepage.css'
import { Book } from '../../types';

export default function Homepage() {

   
   
    const [bestsellers, setBestsellers] = useState<Book[]>([])


    useEffect(() => {
        fetch('http://localhost:8000/')
        .then(res => res.json())
        .then(data => setBestsellers(data))
    }, [])

  
    const [matches] = useState(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const [isPlaying, setIsPlaying] = useState(true)
    const animationRef = useRef<HTMLUListElement>(null)

    const toggleAnimation = () => {
        setIsPlaying(!isPlaying);
        if (animationRef.current) {
        animationRef.current.style.animationPlayState = isPlaying ? 'paused' : 'running';
        }
    }

    const bestsellerElements = bestsellers.map((bestseller: Book)=> {
        return(
        <li className='bestseller-element' key={bestseller.title_id} >
            <Link to={`/book/${bestseller.title_id}`}><img src={bestseller.imageLinks['smallThumbnail']} alt="bestseller-img" /></Link>
        </li>
        )
    })

  

    function signUp(formData: FormData) {
        const data = Object.fromEntries(formData)
        console.log('data:', data)
        
        
         fetch('http://localhost:8000/userSignup', {
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
        
        <div className="book-scroller"
        onMouseEnter={toggleAnimation}
        onMouseLeave={toggleAnimation}
        {...(matches ? {'data-animated': true} : {})}
        >
        <h2>Best Sellers</h2>
        <ul className="bestseller-list book-scroller__inner" ref={animationRef}>
            {bestsellerElements}
            {bestsellerElements}
        </ul>
        </div>
        <div className="main-content">
            <h2>Create a Book Club with your Friends!</h2>
            <p className='subtitle subtitle-signup'>Register today!</p>
            <hr className='hr hr-signup'/>
            <form className='email-collector' 
                action={signUp as any}
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
                    id='userPassword' 
                    placeholder='Enter your password' 
                    name='userPassword' 
                    required/>
                <button className='btn btn-signup' type='submit'>Register</button>
            </form>
        </div>


      </div>
    )
}