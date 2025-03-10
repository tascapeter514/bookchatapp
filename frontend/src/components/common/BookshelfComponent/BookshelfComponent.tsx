import {Bookshelf} from '../../../types'
import './BookshelfComponent.css'
import { LikeIcon, DislikeIcon } from '../Icons'

interface BookshelfProps {
    bookshelf: Bookshelf,
    activeBookshelf: number
}


const BookshelfComponent = (props: BookshelfProps) => {

    const  {bookshelf } = props

    const bookshelfTitles = (bookshelf?.titles ?? []).map((bookshelfTitle) => {
       return <li className='book-card-listElement' key={bookshelfTitle.title_id}>
                <article className="book-card" >
 
                        <div className="img-overlay">
                            <img src={bookshelfTitle.imageLinks.thumbnail} alt="book-card-cover" className='book-card-img' />
                            <div className="book-card-buttons">
                                <LikeIcon></LikeIcon>
                                <DislikeIcon></DislikeIcon>
                            </div>
                        </div>
                       
                    <div className="book-card-back">
                        <h3 className="book-card-title">{bookshelfTitle.title}</h3>
                        {bookshelfTitle.authors.map(author => (
                            <li className='card-author-listElement' key={author.author_id}><span className='card-author-name'>{author.name}</span></li>
                        ))}
                        <p className="book-card-ratings">{bookshelfTitle.averageRating} out of {bookshelfTitle.ratingsCount} ratings</p>
                        
                    </div>
                </article>
                
             </li>

    })






    return(
        <section className="bookshelf-container">
            <ul className='bookshelf-title-list'>{bookshelfTitles}</ul>
        </section>
        
    )
}

export default BookshelfComponent