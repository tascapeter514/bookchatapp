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
    // handleBookclubSelection: (id: number) => void,
    // handleBookshelfSelection: (id: number) => void,
    // handleAddBookToBookclub: () => void,
    handleGetUserBookclubs: () => Promise<void>,
    bookclubData: Bookclub[],
    isGettingBookclubs: boolean,
    isGetBookclubsError: boolean,
    // bookclubSelection: number


}


const WithAddBookToBookclubLogic = (
    WrappedComponent: ComponentType<InjectedProps & WithAddBookToBookclubProps>

): ComponentType<WithAddBookToBookclubProps> => {

    return function WithAddBookToBookclubLogicWrapper(props: WithAddBookToBookclubProps) {


        const [bookclubSelection, setBookclubSelection] = useState<number | null>(null)
        const handleBookclubSelection = (id: number) => setBookclubSelection(id)

        const [bookshelfSelection, setBookshelfSelection] = useState<number>(0)
        const handleBookshelfSelection = (id: number) => setBookshelfSelection(id)

        const { user } = useSelector((state: RootState) => state.auth)

        


        console.log('user:', user)


        const [bookclubData, setBookclubData] = useState<MapperData[]>([])
        const [getUserBookclubs, { isLoading: isGettingBookclubs, isError: isGetBookclubsError }] = useGetUserBookclubsMutation()
        const handleGetUserBookclubs = useCallback(async (): Promise<void> => {

            const response = await getUserBookclubs(user.id);

            if ('data' in response && response.data) {
                setBookclubData(response.data)

            } else {
                throw new Error('There was an error with fetching your bookclubs')
            }

        }, [user.id])

        const [postBookToBookclub, {isLoading: isPostingBookToBookclub, isError: isPostToBookclubError}] = usePostBookToBookclubMutation()

        const handleAddBookToBookclub = () => {
            const data = {
                bookId: props.bookId,
                bookshelfId: bookshelfSelection,
            }
        }
        

        console.log('bookclub data:', bookclubData)


        const injectedProps = {
            // handleBookclubSelection,
            handleGetUserBookclubs,
            bookclubData,
            isGettingBookclubs,
            isGetBookclubsError,
            // bookclubSelection,
            // handleBookshelfSelection

        }


        return <WrappedComponent {...props} {...injectedProps} />

    }


}

export default WithAddBookToBookclubLogic