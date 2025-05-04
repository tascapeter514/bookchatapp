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


        const { user } = useSelector((state: RootState) => state.auth)

        


        console.log('user:', user)


        const [bookclubData, setBookclubData] = useState<Bookclub[]>([])
        const [getUserBookclubs, { isLoading, isError }] = useGetUserBookclubsMutation()

        const handleGetUserBookclubs = useCallback(async (): Promise<void> => {

            const response = await getUserBookclubs(user.id);

            if ('data' in response && response.data) {
                setBookclubData(response.data)

            } else {
                throw new Error('There was an error with fetching your bookclubs')
            }

        }, [user.id])

        // const [postBookToBookclub, {isLoading: isPostingBookToBookclub, isError: isPostToBookclubError}] = usePostBookToBookclubMutation()

        // const handleAddBookToBookclub = () => {
        //     const data = {
        //         bookId: props.bookId,
        //         bookshelfId: bookshelfSelection,
        //     }
        // }
        

        console.log('bookclub data:', bookclubData)


        const injectedProps = {

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