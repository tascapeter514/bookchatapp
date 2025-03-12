import Button from '../../../common/Buttons/Button/Button'
import { Ref, useEffect, useState } from 'react'
import { Book, Bookshelf } from '../../../../types'
import BookSearchbar from './BookSearchbar/BookSearchbar'
import BookResults from './BookResults/BooksResults'
import './SearchBooksModal.css'


interface SearchBooksModalProps {
    closeModal: () => void,
    modalRef: Ref<HTMLDialogElement>,
    bookshelves: Bookshelf[]
}



const SearchBooksModal = ({closeModal, modalRef, bookshelves}: SearchBooksModalProps) => {

    const [bookResults, setBookResults] = useState<Book[]>([])
    const [showBookResults, setShowBookResults] = useState(false)
    const [selectedBook, setSelectedBook] = useState<string>('')
    const [searchValue, setSearchValue] = useState('');
    const [currentBookshelf, setCurrentBookshelf] = useState<string>('')


    const handleBookSelection = (id: string) => {
        setSelectedBook(id)
    }


    // useEffect(() => {
    //     try {
    //         const socket = new WebSocket(`ws://localhost:8000/ws/books`)

    //         socket.onmessage = (event) => {
    //             const data = JSON.parse(event.data)

    //             if (data.type == 'get_books_data') {
    //                 console.log('BOOKS DATA:', data)
    //                 setBookResults(data.books_data)

                    
    //             }
    //         }

    //         socket.onerror = (error) => {
    //             console.error('Websocket books data error', error)
    //         }

    //         socket.onopen = () => console.log('Books websocket connected')
    //         socket.onclose = () => console.log('Books websocket disconnected')

    //         return () => socket.close()

    //     } catch(err) {
    //         console.error('Books websocket failed to initialize:', err)
    //     }



    // }, [])

    const addBook = () => {
        return(

            console.log('add book button check')

        )
    }

    console.log('book results:', bookResults)


    return (
        <dialog className='search-books-modal' ref={modalRef}>
            <h3>Add a new title to your bookclub</h3>
            <hr />
            <section className='search-books-content'>
               
                <article className='suggested-book-list'>
                    <BookSearchbar
                        setBookResults={setBookResults}
                        setShowBookResults={setShowBookResults}
                        showBookResults={showBookResults}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    >

                    </BookSearchbar>
                    <BookResults
                        selectedElement={selectedBook}
                        handleSelection={handleBookSelection}
                        searchValue={searchValue}
                    >
                        {bookResults}


                    </BookResults>
                </article>
                <aside className='bookshelves-list'>
                    {selectedBook && bookshelves !== undefined  ? 
                        bookshelves.length > 0 ? (
                        bookshelves.map((bookshelf, index) => {
                        {return <li key={index} className='bookshelf-result'
                                >
                                <label htmlFor={bookshelf.name}>{bookshelf.name}</label>
                                <input 
                                    type="radio" 
                                    className='bookshelf-input' 
                                    id={bookshelf.name}
                                    name='bookshelfGroup'
                                    checked={currentBookshelf === bookshelf.bookshelf_id} 
                                    onClick={() => setCurrentBookshelf(bookshelf.bookshelf_id)}/>
                                </li> }
                        })
                        ) : (<span>No bookshelves  in your bookclub</span>)
                        : 'No Book Selected'}
                    </aside>
            </section>
            <div className="button-wrapper">
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={addBook}>Add Book</Button>
            </div>
        </dialog>

    )
}

export default SearchBooksModal