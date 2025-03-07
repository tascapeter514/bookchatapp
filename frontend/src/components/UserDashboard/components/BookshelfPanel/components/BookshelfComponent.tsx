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
       return <li className='book-card-listElement' key={bookshelfTitle.title_id}>
                <article className="book-card" >
                    <div className="book-card-front">
                        <div className="img-overlay"><img src={bookshelfTitle.imageLinks.thumbnail} alt="book-card-cover" className='book-card-img' /></div>
                        <div className="book-card-buttons">
                            <LikeIcon></LikeIcon>
                            <DislikeIcon></DislikeIcon>
                        </div>
                        <h3 className="book-card-title">{bookshelfTitle.title}</h3>
                        {bookshelfTitle.authors.map(author => (
                            <li className='card-author-listElement' key={author.author_id}><span className='card-author-name'>{author.name}</span></li>
                        ))}
                        <p className="book-card-ratings">{bookshelfTitle.averageRating} out of {bookshelfTitle.ratingsCount} ratings</p>
                    </div>
                    <div className="book-card-back">
                        
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