import BookshelfDisplay from '../../BookshelfDisplay/BookshelfDisplay.tsx'
import { TabState } from '../../../reducers/userTabsReducer.tsx';
import SubHeader from '../../SubHeader/SubHeader.tsx'
import {  Bookshelf } from '../../../types.ts'
import Header from '../../Header/Header.tsx'
import './BookshelfPanel.css';


interface Props {
    bookshelves: Bookshelf[],
    userTabs: TabState
}

const UserBookshelves = ({bookshelves, userTabs}: Props) => {

    return(
        <ul className='bookshelf-panel-list'>
            {bookshelves.map((bookshelf: Bookshelf, index: number) => {
                return(
                    userTabs.activeBookshelf === `bookshelfTab${index}` && 
                    <li 
                        key={bookshelf.id}
                        className='bookshelf-listElement'
                    >
                        <SubHeader>{bookshelf.name}</SubHeader>
                        <BookshelfDisplay >{bookshelf}</BookshelfDisplay>
                    </li>
                )
            })}
        </ul>
    )
}

const BookshelfPanel = ({bookshelves, userTabs}: Props) => {


    return(
        <section className='bookshelves-container' aria-labelledby='tab-1'>
            <Header>Bookshelves</Header>
            <UserBookshelves bookshelves={bookshelves} userTabs={userTabs}/>
            
        </section>

    )
}

export default BookshelfPanel