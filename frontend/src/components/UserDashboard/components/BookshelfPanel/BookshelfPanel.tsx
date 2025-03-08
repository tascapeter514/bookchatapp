import './BookshelfPanel.css';
import { userData } from '../../../common/UserContext.tsx'
import BookshelfComponent from './components/BookshelfComponent'
import Header from '../../../common/Header/Header.tsx'
import SubHeader from '../../../common/SubHeader/SubHeader.tsx'



type BookshelfPanelProps = {activeBookshelf: number}


const BookshelfPanel = (props: BookshelfPanelProps) => {

    const { userBookshelves } = userData()
    const { activeBookshelf } = props
    


    const bookshelfElements = userBookshelves.map((bookshelf, index) => (

        activeBookshelf === index && 
        <li 
            key={bookshelf.bookshelf_id}

        >
            {/* <h2 className='bookshelf-title'>{bookshelf.name}</h2> */}
            <SubHeader>{bookshelf.name}</SubHeader>
            <BookshelfComponent activeBookshelf={activeBookshelf} bookshelf={bookshelf}></BookshelfComponent>
        </li>
        

    ))



    return(

        <div className='bookshelves-container' aria-labelledby='tab-1'>
            <Header>Bookshelves</Header>
            <ul className='bookshelf-panel-list'>{bookshelfElements}</ul>
        </div>

    )
}

export default BookshelfPanel