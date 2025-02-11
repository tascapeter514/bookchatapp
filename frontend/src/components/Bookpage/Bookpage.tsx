import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import { Book, ISBN_Identifier, CurrentUser, Bookshelf, ActiveUser } from '../../types'

interface bookPageProps {
    user: CurrentUser | null
}



const Bookpage: React.FC<bookPageProps> = ({user}) => {
    const storedUser = localStorage.getItem('currentUser')
    const activeUser: ActiveUser = storedUser ? JSON.parse(storedUser) : null;

    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [showBookshelfForm, setShowBookshelfForm] = useState(false)
    const [userBookShelves, setUserBookShelves] = useState<Bookshelf[]>([])
    

    useEffect(() => {
        fetch(`http://localhost:8000/book/${params.id}`)
        .then(res => res.json())
        .then(data => setBook(data))
    }, [params.id])

    useEffect(() => {
        fetch(`http://localhost:8000/api/bookshelf/?user=${activeUser.id}`)
        .then(res => res.json())
        .then(data => setUserBookShelves(data))
        .catch(err => console.log('There was an error retrieving your bookshelf:', err))
    }, [])

    console.log('user bookshelves:', userBookShelves)

    // console.log('book:', book)

    const bookshelfRadioBtns = userBookShelves.map((userBookshelf: Bookshelf) => {
        return(
            <li key={userBookshelf.bookshelf_id}>
                <label>{userBookshelf.name}<input name='bookshelfRadio' type="radio" value={userBookshelf.bookshelf_id} id='bookshelfRadio' /></label>
            </li>
        )
    })



    function addToBookshelf(formData: FormData) {
        console.log('form data:', formData)
        const bookshelf_id = formData.get('bookshelfRadio')
        console.log('bookshelf id:', bookshelf_id)

        const bookshelfRequest = {
            title_id: book?.title_id,

        } 
        try {
            fetch(`http://localhost:8000/api/bookshelf/${bookshelf_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookshelfRequest)
            })

        } catch(err) {
            console.error('Error adding book to bookshelf')
        }
    }

    console.log('bookpage parameters:', params)

    
    return(
        
        <div className='bookpage-container'>
            {book ? (
                <div className="bookpage-detail">
                    <h1>{book.title}</h1>
                    <img src={book.imageLinks['smallThumbnail']} alt="" />
                    <button onClick={() => setShowBookshelfForm(prev => !prev)}>Add to Bookshelf</button>
                    {showBookshelfForm ?  
                        <form action={addToBookshelf as any} className="bookshelf-form" method='patch'>
                            <ul>{bookshelfRadioBtns}</ul>
                            <button type='submit'>Submit</button>
                        </form>

                        : ''
                    
                    }
                    
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