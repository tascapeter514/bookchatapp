import './BookshelfIconButton.css'
import { BookmarkIcon } from '../../Icons'



interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    openModal: () => void
}

const BookshelfIconButton = ({openModal}: Props) => {

    return(
        <button 
            className='bookshelf-icon-button'
            onClick={openModal}
            aria-label='Add to Bookshelf'
        >
            <BookmarkIcon />
            <span>Add to Bookshelf</span>
        </button>

    )

}

export default BookshelfIconButton