import {Bookshelf} from '../../../../../types'
import './BookshelfComponent.css'
import { LikeIcon, DislikeIcon } from '../../../../common/Icons'

interface BookshelfProps {
    bookshelf: Bookshelf,
    activeBookshelf: number
}


const BookshelfComponent = (props: BookshelfProps) => {

    const  {bookshelf } = props

    console.log('bookshelf component data:', bookshelf.titles)

    const bookshelfTitles = bookshelf.titles.map((bookshelfTitle) => {
       return <li key={bookshelfTitle.title_id}>
                <article className="book-card" >
                    <div className="book-card-front">
                        <img src={bookshelfTitle.imageLinks.thumbnail} alt="book-card-cover" className='book-card-img' />
                        <h2 className="book-card-title">{bookshelfTitle.title}</h2>
                        {bookshelfTitle.authors.map(author => (
                            <li className='card-author-listElement' key={author.author_id}><span className='card-author-name'>{author.name}</span></li>
                        ))}
                        <p className="book-card-ratings">{bookshelfTitle.averageRating} out of {bookshelfTitle.ratingsCount} ratings</p>
                    </div>
                    <div className="book-card-back">
                        <div className="book-card-buttons">
                            <LikeIcon></LikeIcon>
                            <DislikeIcon></DislikeIcon>
                        </div>
                    </div>
                </article>
                
             </li>

    })






    return(
        <div className="bookshelf-container">
            <ul className='bookshelf-title-list'>{bookshelfTitles}</ul>
            
        </div>
        
    )
}

export default BookshelfComponent