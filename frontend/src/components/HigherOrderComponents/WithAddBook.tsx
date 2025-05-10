import { ComponentType } from "react"
import { usePostBookMutation } from "../../slices/bookshelfApiSlice"
import { useState, Dispatch } from "react"


interface Props {
    id: number,
    bookshelfId: number
}

interface InjectedProps {
    addBook: () => Promise<void>,
    isError: boolean,
    error: string,
    isLoading: boolean,
    setNewBook: Dispatch<number>
}

const WithAddBook = (
    WrappedComponent: ComponentType<InjectedProps>
): ComponentType<Props> => {

    return function WithAddBookWrapper({ bookshelfId, id}: Props) {

        
        const [newBook, setNewBook] = useState<number>(NaN)
        

        console.log('new book:', newBook)

        const [postBook, {isError, isLoading}] = usePostBookMutation()

        const addBook = async () => {
            console.log('add book')
    
            
    
            console.log('booksearch modal id:', id)
            try {
    
                await postBook({bookshelfId, newBookId: newBook, id}).unwrap()
    
            } catch(err) {
                console.error('add book error:', err)
            }
            
        }

        const injectedProps = {
            addBook,
            isError,
            isLoading,
            error: isError ? "There was a problem adding the book to your bookshelf" : "",
            setNewBook

        }

        return <WrappedComponent {...injectedProps} />
    }
}


export default WithAddBook