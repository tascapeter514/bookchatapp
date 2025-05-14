import { ComponentType } from "react"
import { usePostBookMutation } from "../../slices/bookshelfApiSlice"
import { handleBookError } from "../../utils/errorHandling"
import { BookError } from "../../utils/errorHandling"
import { useSelector } from "react-redux"
import { useGetUserDataQuery } from "../../slices/userDataApiSlice"
import { useState, Dispatch } from "react"
import { RootState } from "../../store/store"
import { ActiveUser, Bookshelf } from "../../types"


interface Props {
    bookId: number,
}

interface InjectedProps {
    addBook: () => Promise<void>,
    isError: boolean,
    error: string,
    isLoading: boolean,
    setBookshelf: Dispatch<number>,
    bookshelves: Bookshelf[],
    user: ActiveUser
}

const WithAddBookToBookshelf = (
    WrappedComponent: ComponentType<InjectedProps>
): ComponentType<Props> => {

    return function WithAddBookToBookshelfWrapper({ bookId}: Props) {

        
        const { user } = useSelector((state: RootState) => state.auth)
        const { data } = useGetUserDataQuery(user?.id, {
            skip: !user?.id
        })


        const [bookshelf, setBookshelf] = useState<number>(NaN)
        const [error, setError] = useState<string>('')
        

        const [postBook, {isError, isLoading}] = usePostBookMutation()


        const addBook = async () => {
    
            try {

                if (!bookshelf || !bookId|| !user.id) {
                    throw new Error('You are missing an id.')
                    
                }
    
                await postBook({bookshelfId: bookshelf, newBookId: bookId, id: user.id}).unwrap()
    
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
            setBookshelf,
            bookshelves: data?.bookshelves as Bookshelf[],
            user

        }

        return <WrappedComponent {...injectedProps} />
    }
}


export default WithAddBookToBookshelf