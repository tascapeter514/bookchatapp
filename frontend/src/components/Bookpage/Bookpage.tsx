import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import { Book, ISBN_Identifier, CurrentUser } from '../../types'

interface bookPageProps {
    user: CurrentUser | null
}


const Bookpage: React.FC<bookPageProps> = ({user}) => {
    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/book/${params.id}`)
        .then(res => res.json())
        .then(data => setBook(data))
    }, [params.id])

    console.log('book:', book)

    function addToBookshelf() {
        const bookshelf_title = {
            title_id: book?.title_id

        } 
        try {
            fetch(`http://localhost:8000/api/bookshelf/6968a38d3a1e4e358cc70f680816b859/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookshelf_title)
            })

        } catch(err) {
            console.error('Error adding book to bookshelf')
        }
    }

    
    return(
        
        <div className='bookpage-container'>
            {book ? (
                <div className="bookpage-detail">
                    <h1>{book.title}</h1>
                    <img src={book.imageLinks['smallThumbnail']} alt="" />
                    <button onClick={addToBookshelf}>Add to Bookshelf</button>
                    <p>{book.description}</p>
                    <p>Publisher: {book.publisher}</p>
                    <ul>
                        {book.ISBN_Identifiers.map((obj: ISBN_Identifier, index: number) => (
                            <li key={index}> {obj.type} : {obj.identifier}</li>
                        ))}

                    </ul>
                </div>

            ) : <h2>Loading...</h2>}
        </div>

    )
}

export default Bookpage