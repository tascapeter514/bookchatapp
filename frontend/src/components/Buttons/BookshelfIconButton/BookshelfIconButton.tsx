import './BookshelfIconButton.css'
import { BookmarkIcon } from '../../Icons'



interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    openModal: () => void
}

const BookshelfIconButton = ({openModal}: Props) => {

    return(
        <div className='bookshelf-icon-button' >
            <BookmarkIcon onClick={openModal} />
            <span>Add to Bookshelf</span>
        </div>

    )

}

export default BookshelfIconButton