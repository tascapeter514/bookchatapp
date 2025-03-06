import {Bookshelf} from '../../../../../types'
import './BookshelfComponent.css'

interface BookshelfProps {
    bookshelf: Bookshelf,
    activeBookshelf: number
}


const BookshelfComponent = (props: BookshelfProps) => {
    return(
        <div className="bookshelf-container">
            <p>{props.bookshelf.name}</p>
        </div>
    )
}

export default BookshelfComponent