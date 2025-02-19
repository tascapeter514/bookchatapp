import './BooksPanel.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Bookshelf } from '../../../../types.ts';

interface BooksPanelProps {
    userBookshelves: Bookshelf[]
}




const BooksPanel: React.FC<BooksPanelProps> = ({userBookshelves}) => {

    console.log('book panel bookshelves:', userBookshelves)
    const titles = userBookshelves.map((userBookshelf: Bookshelf) => userBookshelf.titles).flat()
   





    const [bookShelves, setBookShelves] = useState<Bookshelf[]>(userBookshelves)
    const [userBooks, setUserBooks] = useState<Book[]>(titles)

      const userBooksElements = userBooks.map((userBookElement: Book) => {
        return(<li key={userBookElement.title_id} className='userBook-element'>
                <Link to={`/book/${userBookElement.title_id}`}><img src={userBookElement.imageLinks['smallThumbnail']} alt="book-cover" /></Link>
                <h3>{userBookElement.title}</h3>
                <ul>{userBookElement.authors.map((author) => {
                    return(<li className='bookElements-authors' key={author.author_id}>{author.name}</li>)
                })}</ul>
                <p>{userBookElement.averageRating}</p>
            
        </li>)
    })



    return(

        <div id='books' aria-labelledby='tab-1'>
            <h2>Books</h2>
            <ul>{userBooksElements}</ul>
        </div>

    )
}

export default BooksPanel