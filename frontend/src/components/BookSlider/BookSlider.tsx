import './BookSlider.css'
import { useState, useRef, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Book } from '../../types'



interface Props {
    children: Book[]
}

const BookSlider = ({children}: Props) => {

    if (!children) return null;

    const [matches] = useState(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const [isPlaying, setIsPlaying] = useState(true)
    const animationRef = useRef<HTMLUListElement>(null)

    const toggleAnimation = () => {
        setIsPlaying(!isPlaying);
        if (animationRef.current) {
        animationRef.current.style.animationPlayState = isPlaying ? 'paused' : 'running';
        }
    }

    const bookElements = children.map((book: Book)=> {
        return(
        <li className='book-element' key={book.id} >
            <Link to={`/book/${book.id}`}><img src={book.imageLinks['smallThumbnail']} alt="bestseller-img" /></Link>
        </li>
        )
    })


    return(

        <div className="book-scroller"
            onMouseEnter={toggleAnimation}
            onMouseLeave={toggleAnimation}
            {...(matches ? {'data-animated': true} : {})}
        >
            <ul className="book-list book-scroller__inner" ref={animationRef}>
                {bookElements}
                {bookElements}
            </ul>
        </div>

        



    )
}

export default memo(BookSlider)