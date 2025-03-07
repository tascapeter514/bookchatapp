import {Bookshelf} from '../../../../../types'
import './BookshelfComponent.css'

interface BookshelfProps {
    bookshelf: Bookshelf,
    activeBookshelf: number
}


const BookshelfComponent = (props: BookshelfProps) => {

    const  {bookshelf } = props

    const bookshelfTitles = bookshelf.titles.map((bookshelfTitle) => {
       return <li key={bookshelfTitle.title_id}>
                <div className="book-card" style={{ backgroundImage: `url(${bookshelfTitle.imageLinks.thumbnail})` }}>
                    <h2 className="book-card-title">{bookshelfTitle.title}</h2>
                    <a href="" className="book-card-button"></a>
                </div>
             </li>

    })






    return(
        <div className="bookshelf-container">
            <ul className='bookshelf-title-list'>{bookshelfTitles}</ul>
            
        </div>
        
    )
}

export default BookshelfComponent