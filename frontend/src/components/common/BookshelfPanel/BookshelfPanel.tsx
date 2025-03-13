import './BookshelfPanel.css';
import { Bookshelf } from '../../../types.ts'
import BookshelfComponent from './components/BookshelfComponent/BookshelfComponent.tsx'
import SearchBooksModal from './components/SearchBooksModal/SearchBooksModal.tsx'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { SearchIcon } from '../Icons.tsx'
import Button from '../Buttons/Button/Button.tsx'
import Header from '../Header/Header.tsx'
import SubHeader from '../SubHeader/SubHeader.tsx'
import axios from 'axios'

type BookshelfPanelProps = {
    activeBookshelf: number,
    bookshelves: Bookshelf[] | [],
    // selectedBook: string,
    deleteTitle: (book_id: string) => Promise<void>,
    setDeleteBookshelf: Dispatch<SetStateAction<string>>,
    setBookshelves: Dispatch<SetStateAction<Bookshelf[]>>

  }

const BookshelfPanel = ({activeBookshelf, bookshelves, deleteTitle, setDeleteBookshelf, setBookshelves}: BookshelfPanelProps) => {

    const searchBooksRef = useRef<HTMLDialogElement>(null)
    const openSearchBooks = () => searchBooksRef.current?.showModal()
    const closeSearchBooks = () => searchBooksRef.current?.close()
    const [newBookId, setNewBookId] = useState<string>('')


    const addBook = async (bookshelf: Bookshelf) => {

        const bookshelfRequest = {
            book_id: newBookId
        } 

        try {
            const response = await axios.put(`http://localhost:8000/api/bookclub/addBook/${bookshelf.bookshelf_id}`, bookshelfRequest)


            if (response.status == 200) {
                console.log("axios add book response:", response.data)

                setBookshelves(prevBookshelves => 
                    prevBookshelves.map(bs =>
                        bs.bookshelf_id === bookshelf.bookshelf_id ? response.data : bs
                    )
                )
                // closeSearchBooks()

            } else {
                console.log("There was an error with the response:", response.statusText)
            }
            
        } catch(err) {
            console.log('There was an error adding your book:', err)
        }
    }

    const bookshelfElements = bookshelves?.map((bookshelf, index) => (
        activeBookshelf === index && 
            <li 
                key={bookshelf.bookshelf_id}
                className='bookshelf-listElement'

            >
                <SubHeader>{bookshelf.name}</SubHeader>
                <BookshelfComponent 
                    activeBookshelf={activeBookshelf} 
                    bookshelf={bookshelf}
                    deleteTitle={deleteTitle}
                    setDeleteBookshelf={setDeleteBookshelf}
                ></BookshelfComponent>
            </li>
    ))

    return(
        <section className='bookshelves-container' aria-labelledby='tab-1'>
             <Button
                onClick={openSearchBooks}
            >
                <SearchIcon></SearchIcon>
            </Button>
             <SearchBooksModal
                modalRef={searchBooksRef}
                closeModal={closeSearchBooks}
                bookshelves={bookshelves}
                setSelectedBook={setNewBookId}
                selectedBook={newBookId}
                addBook={addBook}
                                
            >

            </SearchBooksModal>
            <Header>Bookshelves</Header>
            <ul className='bookshelf-panel-list'>{bookshelfElements}</ul>
        </section>

    )
}

export default BookshelfPanel