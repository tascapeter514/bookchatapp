import BookshelfDisplay from '../../BookshelfDisplay/BookshelfDisplay.tsx'
import { TabState } from '../../../reducers/tabsReducer.tsx';
import SubHeader from '../../Headers/SubHeader/SubHeader.tsx'
import {  Bookshelf } from '../../../types.ts'
import Header from '../../Headers/Header/Header.tsx'
import './BookshelfPanel.css';


interface Props {
    bookshelves: Bookshelf[],
    tabs: TabState,
    id: number
}

const Bookshelves = ({bookshelves, tabs, id}: Props) => {

    

    return(
        <ul className='bookshelf-panel-list'>
            {bookshelves.map((bookshelf: Bookshelf, index: number) => {
                return(
                    tabs.activeBookshelf === `bookshelfTab${index}` && 
                    <li 
                        key={bookshelf.id}
                        className='bookshelf-listElement'
                    >
                        <SubHeader>{bookshelf.name}</SubHeader>
                        <BookshelfDisplay id={id}>{bookshelf}</BookshelfDisplay>
                    </li>
                )
            })}
        </ul>
    )
}

const BookshelfPanel = ({bookshelves, tabs, id}: Props) => {


    return(
        <section className='bookshelves-container' aria-labelledby='tab-1'>
            <Header>Bookshelves</Header>
            <Bookshelves bookshelves={bookshelves} tabs={tabs} id={id}/>
        </section>

    )
}

export default BookshelfPanel