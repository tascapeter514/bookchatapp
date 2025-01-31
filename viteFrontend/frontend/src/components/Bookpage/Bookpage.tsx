import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import { Book } from '../../types'

export default function Bookpage() {
    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/book/${params.id}`)
        .then(res => res.json())
        .then(data => setBook(data))
    }, [params.id])

    
    return(
        
        <div className='bookpage-container'>
            {book ? (
                <div className="bookpage-detail">
                    <h1>{book.title}</h1>
                    <img src={book.imageLinks['smallThumbnail']} alt="" />
                    <button>Add to Bookshelf</button>
                    <p>{book.description}</p>
                    <p>Publisher: {book.publisher}</p>
                    <p>{book.ISBN_Identifiers[0]['type']}: {book.ISBN_Identifiers[0]['identifier']}</p>
                    <p>{book.ISBN_Identifiers[1]['type']}: {book.ISBN_Identifiers[1]['identifier']}</p>
                </div>

            ) : <h2>Loading...</h2>}
        </div>

    )
}