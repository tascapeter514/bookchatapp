import { Book, Author } from '../../types'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RightArrow, LeftArrow } from '../Icons'
import './Carousel.css'


interface Props {
    children: Book[]
}



const Carousel = ({children}: Props) => {

    const carouselRef = useRef<HTMLUListElement>(null);
    const firstBookRef = useRef<HTMLLIElement>(null)
    const [offset, setOffset] = useState(0)

    const scroll = (direction: 'left' | 'right') => {
        console.log('scroll check')
        const container = carouselRef.current;
        if (!container) return

        const book = container.querySelector('.carousel-element') as HTMLLIElement | null
        if (!book) return

        const bookStyle = getComputedStyle(book)
        const bookWidth = book.offsetWidth + parseFloat(bookStyle.marginRight || '0')

        const scrollAmount = bookWidth * 5;
        const maxScroll = container.scrollWidth - container.offsetWidth

        setOffset(prevOffset => {
            const newOffset =
                direction === 'left'
                ? Math.min(prevOffset + scrollAmount, 0)
                : Math.max(prevOffset - scrollAmount, -maxScroll);
            return newOffset;
        })
    }

    //    setOffset(prevOffset => {
    //     const newOffset = direction === 'left' ? prevOffset - scrollAmount : prevOffset + scrollAmount
    //     return Math.max(Math.min(newOffset, 0), -(container.scrollWidth - container.offsetWidth))
    //    })



    const books = children.map((book: Book, index: number)=> {
        return(

        <li className='carousel-element' key={book.id} ref={index === 0 ? firstBookRef : null}>
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
            <button className="handle left-handle">
                <LeftArrow onClick={() => scroll('left')} />
            </button>
            <ul className='carousel' ref={carouselRef} >
                {books}
            </ul>
            <button className="handle right-handle">
                <RightArrow onClick={() => scroll('right')}/>
            </button>
        </div>

    )

}

export default Carousel

// style={{ transform: `translateX(${offset}px)` }}