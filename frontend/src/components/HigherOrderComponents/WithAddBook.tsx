import { ComponentType } from "react"
import { usePostBookMutation } from "../../slices/bookshelfApiSlice"
import { handleBookError } from "../../utils/errorHandling"
import { BookError } from "../../utils/errorHandling"
import { useState, Dispatch } from "react"


interface Props {
    bookshelfId?: number,
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

    return function WithAddBookWrapper({ bookshelfId}: Props) {

        
        const [newBook, setNewBook] = useState<number>(NaN)
        const [error, setError] = useState<string>('')
        

        const [postBook, {isError, isLoading}] = usePostBookMutation()


        const addBook = async () => {
    
            try {

                if (!bookshelfId || !newBook) {
                    throw new Error('You are missing an id.')
                    
                }
    
                await postBook({bookshelfId, newBookId: newBook}).unwrap()
    
            } catch(err: any | BookError) {
                console.log('catch handler running')
                console.log('add book error log:', err)
                console.error('add book error:', err)

                console.log('Error' in err)

                err instanceof Error ? setError(err.message) : setError(handleBookError(err))

            }
            
        }


        const injectedProps = {
            addBook,
            isError,
            isLoading,
            error,
            setNewBook

        }

        return <WrappedComponent {...injectedProps} />
    }
}


export default WithAddBook