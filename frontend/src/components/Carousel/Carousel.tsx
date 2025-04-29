import { Book, Author } from '../../types'
import { useRef, useState, MouseEvent, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { RightArrow, LeftArrow } from '../Icons'
import './Carousel.css'


interface Props {
    children: Book[]
}


const Carousel = ({children}: Props) => {

    const carouselRef = useRef<HTMLUListElement>(null);
    const [booksPerPage, setBooksPerPage] = useState<number>(5)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [layoutReady, setLayoutReady] = useState<boolean>(false)

    useLayoutEffect(() => {

        const getBooksPerPage = () => {
            console.log('get books per page check')
            const container = carouselRef.current;
            console.log('container:', container)
            if (!container) return 5;
        
            const containerWidth = container.offsetWidth;
            const book = container.querySelector('.carousel-element') as HTMLElement;
            if (!book) return 5;
        
            const bookWidth = book.offsetWidth;
            const books = Math.floor(containerWidth / bookWidth)
            setBooksPerPage(books)
            setLayoutReady(true)
        }

        getBooksPerPage()
        window.addEventListener('resize', getBooksPerPage)
        return () => window.removeEventListener('resize', getBooksPerPage)

    }, [])

   
    const totalBooks = children.length
    const maxPage = Math.ceil(totalBooks / booksPerPage) - 1

    
    
    const handleScroll = (e: MouseEvent<HTMLButtonElement>) => {

        if(!layoutReady) return;


        const handle = e.currentTarget
        const carousel = carouselRef.current
        if (!carousel) return;

        const book = carousel.querySelector('.carousel-element') as HTMLElement;
        if(!book) return

        const bookWidth = book.offsetWidth;


        const newPage = handle.classList.contains('right-handle')
            ? Math.min(currentPage + 1, maxPage)
            : Math.max(0, currentPage - 1)

        setCurrentPage(newPage)


        const scrollAmount = (bookWidth) * booksPerPage * newPage

        
        carousel.style.transform = `translateX(-${scrollAmount}px)`
    
        
    }

  



    const books = children.map((book: Book)=> {
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
