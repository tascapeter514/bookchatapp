import './BooksPanel.css';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Book, Bookshelf } from '../../../../types.ts';
import { userData } from '../../../../components/common/UserContext.tsx'
import Header from '../../../common/Header/Header.tsx'






const BooksPanel: React.FC = () => {

    const { userBookshelves } = userData()



    useEffect(() => {
        console.log('user bookshelves:', userBookshelves)
    }, [userBookshelves]);









    const titles = userBookshelves.map((userBookshelf: Bookshelf) => userBookshelf.titles).flat()



    console.log('user titles:', titles)
   

      const userBooksElements = titles.map((userBookElement: Book, index: number) => {
        return(<li key={index} className='userBook-element'>
                <Link to={`/book/${userBookElement.title_id}`}><img src={userBookElement.imageLinks['smallThumbnail']} alt="book-cover" /></Link>
                <h3>{userBookElement.title}</h3>
                <ul>{userBookElement.authors.map((author) => {
                    return(<li className='bookElements-authors' key={author.author_id}>{author.name}</li>)
                })}</ul>
                <p>{userBookElement.averageRating}</p>
            
        </li>)
    })



    return(

        <div className='bookshelves-container' aria-labelledby='tab-1'>
            <Header>Bookshelves</Header>
            {/* <ul>{userBooksElements}</ul> */}
        </div>

    )
}

export default BooksPanel