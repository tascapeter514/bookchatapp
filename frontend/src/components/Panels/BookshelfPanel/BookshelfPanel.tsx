import './BookshelfPanel.css';
import {  Bookshelf } from '../../../types.ts'
import { useReducer, useState } from 'react';
import { userContext } from '../../../context/UserContext/UserContext.tsx';
import BookshelfDisplay from '../../BookshelfDisplay/BookshelfDisplay.tsx'
import Header from '../../Header/Header.tsx'
import SubHeader from '../../SubHeader/SubHeader.tsx'


const BookshelfPanel = () => {

    const { bookshelves, userTabs } = userContext()
    
    

    console.log('book panel bookshelves:', bookshelves)
    // console.log('reducer bookshelves:', bookSearch.bookshelves);

    if (userTabs.activeBookshelf === 'bookshelfTab0') {
        console.log('james joyce bookshelf')
        console.log('james joyce books:', bookshelves.data?.map(bookshelf => bookshelf.books))
    }
    

    const bookshelfElements = bookshelves.data?.map((bookshelf, index) => (
        
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