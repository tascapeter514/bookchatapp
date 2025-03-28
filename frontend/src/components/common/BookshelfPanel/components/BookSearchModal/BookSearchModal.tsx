import Button from '../../../Buttons/Button/Button'
import { RefObject, useState } from 'react'
import { userContext } from '../../../Context/UserContext/UserContext'
import usePost from '../../../hooks/usePost'
import BookSearchbar from './BookSearchbar/BookSearchbar'
import { Bookshelf } from '../../../../../types'
import './BookSearchModal.css'


interface Props {
    ref: RefObject<HTMLDialogElement>,
    bookshelf: Bookshelf
}



const BookSearchModal = ({ ref }: Props) => {

    const closeModal = () => ref.current?.close()
    const { activeUser, setUserData } = userContext()
    const [newBook, setNewBook] = useState<number>(NaN)
    const {makeRequest, loading, error} = usePost(`http://localhost:8000/api/user/${activeUser.id}`)
    
    const addBook = async (e: FormEvent) => {
        console.log('handle submit called')

        e.preventDefault()

        const request = {
            name: String(name),
        }
        try {
            console.log('before make request')
            const newItem = await makeRequest(request)

            if (!newItem) {
                console.log('no new item')
            }
            // console.log('after make request')

            // console.log('new item:', newItem)
            setUserData(prevData => 
                prevData.map(data =>
                    data.type === 'bookshelf'
                    ? {...data, items: [...data.items, newItem]}
                    : data
                )
            )
            
        } catch(err) {
            console.log('error handling submission:', err)
        }

    
    }



    return (
        <dialog className='search-books-modal' ref={ref}>
            <h3>Add a new title to your bookshelf</h3>
            <hr />
            <section className='search-books-content'>
                
                <article className='suggested-book-list'>
                    <BookSearchbar></BookSearchbar>
                    
                </article>
                
            </section>
            <div className="button-wrapper">
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={() => addBook}>Add Book</Button>
            </div>
        </dialog>

    )
}


export default BookSearchModal

// onClick={async () => newBookId && await addBook(newBookId, currBkslfId)}
{/* <aside className='bookshelves-list'>
                    {newBookId && bookshelves !== undefined  ? 
                        bookshelves.length > 0 ? (
                        bookshelves.map((bookshelf) => {
                        {return <li key={bookshelf.bookshelf_id} className='bookshelf-result'
                                >
                                <label htmlFor={bookshelf.name}>{bookshelf.name}</label>
                                <input 
                                    type="radio" 
                                    className='bookshelf-input' 
                                    id={bookshelf.name}
                                    name='bookshelfGroup'
                                    checked={currBkslfId === bookshelf.bookshelf_id} 
                                    onChange={() => setCurrBkslfId(bookshelf.bookshelf_id)}/>
                                </li> }
                        })
                        ) : (<span>No bookshelves  in your bookclub</span>)
                        : 'No Book Selected'}
                    </aside> */}