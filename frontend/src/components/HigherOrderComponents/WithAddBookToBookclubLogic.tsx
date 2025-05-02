import { ComponentType, useCallback } from 'react'
import {  MapperData } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useGetUserBookclubsMutation } from '../../slices/userDataApiSlice'
import { useState } from 'react'
// import { usePostBookToBookclubMutation } from '../../slices/bookclubApiSlice'

interface WithAddBookToBookclubProps {
    bookId: number
}

interface InjectedProps {
    handleSelection: (id: number) => void,
    // handleAddBookToBookclub: () => void,
    handleGetUserBookclubs: (id: number) => Promise<void>,
    bookclubData: MapperData[],
    isGettingBookclubs: boolean,
    isGetBookclubsError: boolean,


}


const WithAddBookToBookclubLogic = (
    WrappedComponent: ComponentType<InjectedProps & WithAddBookToBookclubProps>

): ComponentType<WithAddBookToBookclubProps> => {

    return function WithAddBookToBookclubLogicWrapper(props: WithAddBookToBookclubProps) {


        const [selection, setSelection] = useState<number>(0)
        const handleSelection = (id: number) => setSelection(id)

        const { user } = useSelector((state: RootState) => state.auth)


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

        // const [postBookToBookclub, {isLoading: isPostingBookToBookclub, isError: isPostToBookclubError}] = usePostBookToBookclubMutation()

        // const handleAddBookToBookclub = () => {
        //     const data = {
        //         bookId: props.bookId,
        //         bookshelfId: selection,
        //     }
        // }
        




        const injectedProps = {
            handleSelection,
            handleGetUserBookclubs,
            bookclubData,
            isGettingBookclubs,
            isGetBookclubsError,

        }


        return <WrappedComponent {...props} {...injectedProps} />

    }


}

export default WithAddBookToBookclubLogic