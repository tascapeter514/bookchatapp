import { ComponentType, useCallback } from 'react'
import {  Bookclub } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useGetUserBookclubsMutation } from '../../slices/userDataApiSlice'
import { useState } from 'react'
import { usePostBookToBookclubMutation } from '../../slices/bookclubApiSlice'

interface WithAddBookToBookclubProps {
    bookId: number
}

interface InjectedProps {

    handleAddBookToBookclub: (bookshelfId: number, bookclubId: number) => Promise<void>,
    handleGetUserBookclubs: () => Promise<void>,
    bookclubData: Bookclub[],
    isLoading: boolean,
    isError: boolean,
    error: string



}


const WithAddBookToBookclubLogic = (
    WrappedComponent: ComponentType<InjectedProps>

): ComponentType<WithAddBookToBookclubProps> => {

    return function WithAddBookToBookclubLogicWrapper(props: WithAddBookToBookclubProps) {

        const { user } = useSelector((state: RootState) => state.auth) ?? {}

    
        // console.log('user:', user)
        console.log('book prop id:', props.bookId)


        const [bookclubData, setBookclubData] = useState<Bookclub[]>([])
        const [getUserBookclubs, { isLoading, isError }] = useGetUserBookclubsMutation()

        const handleGetUserBookclubs = useCallback(async (): Promise<void> => {

            if (!user) {
                console.warn('User is not logged in')
                return
            }


            const response = await getUserBookclubs(user.id);

            if ('data' in response && response.data) {
                setBookclubData(response.data)

            } else {
                throw new Error('There was an error with fetching your bookclubs')
            }

        }, [user])

        const [postBookToBookclub] = usePostBookToBookclubMutation()

        const handleAddBookToBookclub = useCallback(async (bookshelfId: number, bookclubId: number) => {

            console.log('handle add book id:', props.bookId)

            const data = {
                newBookId: props.bookId,
                bookshelfId: bookshelfId
            }

            try {

                await postBookToBookclub({bookclubId, data}).unwrap()

            } catch(err: any) {
                console.error('There was an error adding this book to your bookclub')
            }

           
            

            
        }, [props.bookId])
        

        console.log('bookclub data:', bookclubData)


        const injectedProps = {

            handleAddBookToBookclub,
            handleGetUserBookclubs,
            bookclubData,
            isLoading,
            isError, 
            error: isError ? 'There was a problem fetching your bookclubs' : ''


        }


        return <WrappedComponent {...injectedProps} />

    }


}

export default WithAddBookToBookclubLogic