import './BooksPanel.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Bookshelf, ActiveUser } from '../../../../types.ts';

interface BooksPanelProps {
    user: ActiveUser
}




const BooksPanel: React.FC<BooksPanelProps> = ({user}) => {

    useEffect(() => {
        fetch(`http://localhost:8000/api/bookshelf/?user=${user.id}`)
        .then(res => res.json())
        .then(data => {
            setBookShelves(data)
            setUserBooks(data[0]['titles'])
    
        } )
        .catch(err => console.log('There was an error:', err))
        }, [])



    const [bookShelves, setBookShelves] = useState<Bookshelf[]>([])
    const [userBooks, setUserBooks] = useState<Book[]>([])

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