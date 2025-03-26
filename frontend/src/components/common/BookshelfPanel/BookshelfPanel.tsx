import './BookshelfPanel.css';
import { BookshelfData } from '../../../types.ts'
import { userContext } from '../Context/UserContext/UserContext.tsx';
import BookshelfDisplay from './components/BookshelfDisplay/BookshelfDisplay.tsx'
import Header from '../Header/Header.tsx'
import SubHeader from '../SubHeader/SubHeader.tsx'


type Props = {
    bookshelves: BookshelfData | undefined,

  }

const BookshelfPanel = ({bookshelves}: Props) => {

    const { userTabs } = userContext()
    

    const bookshelfElements = bookshelves?.items.map((bookshelf, index) => (
        userTabs.activeBookshelf === `bookshelfTab${index}` && 
            <li 
                key={bookshelf.id}
                className='bookshelf-listElement'

            >
                <SubHeader>{bookshelf.name}</SubHeader>
                <BookshelfDisplay>{bookshelf}</BookshelfDisplay>
            </li>
    ))

    return(
        <section className='bookshelves-container' aria-labelledby='tab-1'>
            <Header>Bookshelves</Header>
            <ul className='bookshelf-panel-list'>{bookshelfElements}</ul>
        </section>

    )
}

export default BookshelfPanel