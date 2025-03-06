import './BookshelfPanel.css';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Book, Bookshelf } from '../../../../types.ts';
import { userData } from '../../../common/UserContext.tsx'
import BookshelfComponent from './components/BookshelfComponent'
import Header from '../../../common/Header/Header.tsx'



type BookshelfPanelProps = {activeBookshelf: number}


const BookshelfPanel = (props: BookshelfPanelProps) => {

    const { userBookshelves } = userData()
    const { activeBookshelf } = props
    



    // useEffect(() => {
    //     console.log('user bookshelves:', userBookshelves)
    // }, [userBookshelves]);


    // const titles = userBookshelves.map((userBookshelf: Bookshelf) => userBookshelf.titles).flat()



    // console.log('user titles:', titles)
   

    //   const userBooksElements = titles.map((userBookElement: Book, index: number) => {
    //     return(<li key={index} className='userBook-element'>
    //             <Link to={`/book/${userBookElement.title_id}`}><img src={userBookElement.imageLinks['smallThumbnail']} alt="book-cover" /></Link>
    //             <h3>{userBookElement.title}</h3>
    //             <ul>{userBookElement.authors.map((author) => {
    //                 return(<li className='bookElements-authors' key={author.author_id}>{author.name}</li>)
    //             })}</ul>
    //             <p>{userBookElement.averageRating}</p>
            
    //     </li>)
    // })

    const bookshelfElements = userBookshelves.map((bookshelf, index) => (

        activeBookshelf === index && 
        <li 
            key={bookshelf.bookshelf_id}

        >
            <h2 className='bookshelf-title'>{bookshelf.name}</h2>
            <BookshelfComponent activeBookshelf={activeBookshelf} bookshelf={bookshelf}></BookshelfComponent>
        </li>
        

    ))



    return(

        <div className='bookshelves-container' aria-labelledby='tab-1'>
            <Header>Bookshelves</Header>
            <ul>{bookshelfElements}</ul>
        </div>

    )
}

export default BookshelfPanel