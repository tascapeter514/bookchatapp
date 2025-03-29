import './BookshelfPanel.css';
import { BookshelfData, Bookshelf } from '../../../types.ts'
import { useReducer, useState } from 'react';
import { userContext } from '../Context/UserContext/UserContext.tsx';
import BookshelfDisplay from './components/BookshelfDisplay/BookshelfDisplay.tsx'
import booksearchReducer from '../../../reducers/booksearchReducer.tsx';
import Header from '../Header/Header.tsx'
import SubHeader from '../SubHeader/SubHeader.tsx'


type Props = {
    // bookshelfData: BookshelfData | undefined,

  }

const BookshelfPanel = () => {

    const { userData, userTabs } = userContext()
    const bookshelves = userData.find(data => data.type === 'bookshelf')?.items as Bookshelf[] | []
    

    console.log('book panel bookshelves:', bookshelves)
    // console.log('reducer bookshelves:', bookSearch.bookshelves);
    

    const bookshelfElements = bookshelves.map((bookshelf, index) => (
        userTabs.activeBookshelf === `bookshelfTab${index}` && 
            <li 
                key={bookshelf.id}
                className='bookshelf-listElement'

            >
                <SubHeader>{bookshelf.name}</SubHeader>
                <BookshelfDisplay >{bookshelf}</BookshelfDisplay>
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