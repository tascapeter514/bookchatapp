import { createContext, useContext,  ReactNode, useRef, Ref } from 'react'
import { Bookshelf } from '../../../../types'
import { bookclubData } from '../BookclubContext/BookclubContext'
import axios from 'axios'

type ProviderProps = {children: ReactNode}

interface ContextProps {
    searchBooksRef: Ref<HTMLDialogElement>,
    openSearchBooks: () => void,
    closeSearchBooks: () => void,
    addBook: (book_id: string, bookshelf_id: string) => Promise<void>,
    deleteBook: (book_id: string, bookshelf_id: string) => Promise<void>
}

export const BookshelfContext = createContext<ContextProps>({
    searchBooksRef: null,
    openSearchBooks: () => null,
    closeSearchBooks: () => null,
    addBook: async () => {},
    deleteBook: async () => {}

})

const BookshelfProvider = ({ children }: ProviderProps) => {
    
    const { setBookshelves } = bookclubData()
    const searchBooksRef = useRef<HTMLDialogElement>(null)
    const openSearchBooks = () => searchBooksRef.current?.showModal()
    const closeSearchBooks = () => searchBooksRef.current?.close()



    const deleteBook = async (book_id: string, bookshelf_id: string) => {


        try {
            const response = await axios.delete(`http://localhost:8000/api/book/delete/${book_id}`, {
                data: {
                    bookshelf_id: bookshelf_id
                }
            })

            if (response.status == 200) {
                console.log(response.status)
                setBookshelves(prevBookshelves => 
                    prevBookshelves.map(bs => 
                        bs.bookshelf_id == bookshelf_id ?
                        {...bs, titles: bs.titles?.filter(title => title.title_id !== book_id)} : bs
                    )
                
                )

            } else {
                console.error("Your book delete request encountered an error:", response.statusText)
            }

            

        } catch(err) {
            console.log('Your delete request failed to go through:', err)
        }


    }

    const addBook = async (book_id: string, bookshelf_id: string) => {

        const bookshelfRequest = {
            book_id: book_id
        } 

        try {
            const response = await axios.put(`http://localhost:8000/api/bookclub/addBook/${bookshelf_id}`, bookshelfRequest)


            if (response.status == 200) {
                console.log("axios add book response:", response.data)

                setBookshelves(prevBookshelves => 
                    prevBookshelves.map(bs =>
                        bs.bookshelf_id === bookshelf_id ? response.data : bs
                    )
                )
                

            } else {
                console.log("There was an error with the response:", response.statusText)
            }
            
        } catch(err) {
            console.log('There was an error adding your book:', err)
        }
    }



    return (
        <BookshelfContext.Provider value={{searchBooksRef, openSearchBooks, closeSearchBooks,
            addBook, deleteBook
        }}
        >
            {children}

        </BookshelfContext.Provider>
    )


}

export default BookshelfProvider

export const bookshelfData = () => useContext(BookshelfContext)


type Action = { type: "ADD", bookshelf: Bookshelf } | { type: "DELETE", bookshelf: Bookshelf, book_id: string} 
 
function bookshelfReducer(bookshelves: Bookshelf[], action: Action)  {
    
    switch (action.type) {
        case "ADD": {
            return bookshelves.map(bookshelf => 

                bookshelf.bookshelf_id === action.bookshelf.bookshelf_id ?
                action.bookshelf : bookshelf  
            )
        }
        case "DELETE": {
            return bookshelves.map(bookshelf => 
                bookshelf.bookshelf_id === action.bookshelf.bookshelf_id ?
                {...bookshelf, titles: bookshelf.titles?.filter(title => title.title_id !== action.book_id)} : bookshelf
            )
        }
    

        default: {
            throw new Error(`Unknown action: ${(action as {type: string}).type}`)
        }

        }

    }


