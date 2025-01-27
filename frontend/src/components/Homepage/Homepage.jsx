import React, {useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import './Homepage.css'

export default function Homepage() {

    const [bestsellers, setBestsellers] = useState([])
  

    useEffect(() => {
        fetch('http://localhost:8000/')
        .then(res => res.json())
        .then(data => setBestsellers(data))
    }, [])

  
    const [matches] = useState(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const [isPlaying, setIsPlaying] = useState(true)
    const animationRef = useRef(null)

    const toggleAnimation = () => {
        setIsPlaying(!isPlaying);
        if (animationRef.current) {
        animationRef.current.style.animationPlayState = isPlaying ? 'paused' : 'running';
        }
    }

    const bestsellerElements = bestsellers.map((bestseller)=> {
        return(
        <li className='bestseller-element' key={bestseller.title_id} >
            <Link to={`/book/${bestseller.title_id}`}><img src={bestseller.imageLinks['smallThumbnail']} alt="bestseller-img" /></Link>
        </li>
        )
    })




    return(
      <div className="book-container">
        <h2>Best Sellers</h2>
        <div className="book-scroller"
        onMouseEnter={toggleAnimation}
        onMouseLeave={toggleAnimation}
        {...(matches ? {'data-animated': true} : {})}
        >
        <ul className="bestseller-list book-scroller__inner" ref={animationRef}>
            {bestsellerElements}
            {bestsellerElements}
        </ul>
        </div>
      </div>
    )
}