import { Book, Author } from '../../types'
import { useRef, useState, MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { RightArrow, LeftArrow } from '../Icons'
import './Carousel.css'


interface Props {
    children: Book[]
}



const Carousel = ({children}: Props) => {

    const carouselRef = useRef<HTMLUListElement>(null);
    const booksPerPage = 5;
    const totalBooks = children.length
    const maxPage = Math.ceil(totalBooks / booksPerPage) - 1

    
    const handleScroll = (e: MouseEvent<HTMLButtonElement>) => {

        const handle = e.currentTarget
        const carousel = carouselRef.current
        if (!carousel) return;

        const indexString = getComputedStyle(carousel).getPropertyValue('--slider-index')
        const currentPage = parseInt(indexString, 10) || 0;

        console.log('index type:', typeof currentPage)

        console.log('computed style:', currentPage)

        const newPage = handle.classList.contains('right-handle')
            ? Math.min(currentPage + 1, maxPage)
            : Math.max(0, currentPage - 1)

        carousel.style.setProperty('--slider-index', newPage.toString())
        
    }

  



    const books = children.map((book: Book, index: number)=> {
        return(
        <li className='carousel-element' key={book.id}>
                <Link to={`/book/${book.id}`}>
                    <img src={book.imageLinks['smallThumbnail']} alt="carousel-img" className='carousel-image'/>
                    <small className='carousel-book-title'>{book.name}</small>
                    {book.authors?.map((author: Author) => (
                        <small className='carousel-author-text' key={author.id}>{author.name}</small>
                    ))}
                </Link>
        </li>
        )
    })

    return(

        <div className="carousel-container">
            <button className="handle left-handle" onClick={(e) => handleScroll(e)}>
                <LeftArrow />
            </button>
            <div className="carousel">
                <ul className='book-list'  ref={carouselRef}>
                    {books}
                </ul>
            </div>
            <button className="handle right-handle" onClick={(e) => handleScroll(e)}>
                <RightArrow />
            </button>
        </div>

    )

}

export default Carousel

// style={{ transform: `translateX(${offset}px)` }}