// import {useState, useEffect, ChangeEvent } from 'react';
// import BookSlider from '../common/BookSlider/BookSlider'
// import useLogger from '../common/hooks/useLogger';


import './Homepage.css'
// import { Book } from '../../types';
import RegisterForm from '../Forms/RegisterForm/RegisterForm';

export default function Homepage() {

   
    
    // const [bestsellers, setBestsellers] = useState<Book[]>([])
    


    // useEffect(() => {
    //     fetch('http://localhost:8000/')
    //     .then(res => res.json())
    //     .then(data => setBestsellers(data))
    // }, [])



    return(
      <div className="book-container">
        {/* <h3>Bestsellers</h3>
        <BookSlider books={bestsellers}></BookSlider> */}

        <div className="homepage-main-content">

            <RegisterForm></RegisterForm>

            
        </div>

        



      </div>
    )
}