import './BooksPanel.css';

import { Link } from 'react-router-dom';
import { Book, Bookshelf } from '../../../../types.ts';
import { userData } from '../../../../components/common/UserContext.tsx'






const BooksPanel: React.FC = () => {

    const { userBookshelves } = userData()
    const titles = userBookshelves.map((userBookshelf: Bookshelf) => userBookshelf.titles).flat()
   

      const userBooksElements = titles.map((userBookElement: Book) => {
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