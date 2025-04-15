import { Book, Author } from '../../types'
import { Link } from 'react-router-dom'
import './Carousel.css'


interface Props {
    children: Book[]
}



const Carousel = ({children}: Props) => {


    const carouselElements = children.map((book: Book)=> {
        return(

        <li className='carousel-element' key={book.id} >
            <Link to={`/book/${book.id}`}>
                <img src={book.imageLinks['smallThumbnail']} alt="carousel-img" className='carousel-image'/>
                <small className='carousel-book-title'>{book.name}</small>
                {book.authors?.map((author: Author) => (
                    <li className='carousel-author-text'>
                        <small>{author.name}</small>
                    </li>
                ))}
            </Link>
        </li>
        )
    })

    return(

        <ul className='carousel'>
            {carouselElements}
        </ul>

    )

}

export default Carousel