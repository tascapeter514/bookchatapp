import { ComponentType } from 'react'
import { Bookclub } from '../../types'
import { useState } from 'react'
import { usePostBookToBookclubMutation } from '../../slices/bookclubApiSlice'

interface WithAddBookToBookclubProps {
    bookclub: Bookclub
}

interface InjectedProps {
    handleSelection: (id: number) => void,
    handleAddBookToBookclub: () => void,


}


const WithAddBookToBookclubLogic = (
    WrappedComponent: ComponentType<InjectedProps & WithAddBookToBookclubProps>

): ComponentType<WithAddBookToBookclubProps> => {

    return function WithAddBookToBookclubLogicWrapper(props: WithAddBookToBookclubProps) {


        const [selection, setSelection] = useState<number>(0)
        const handleSelection = (id: number) => setSelection(id)

        const [postBookToBookclub, {isLoading: isPostingBookToBookclub, isError: isPostToBookclubError}] = usePostBookToBookclubMutation()
        




        const injectedProps = {
            handleSelection
        }


        return <WrappedComponent {...props} {...injectedProps} />

    }


}

export default WithAddBookToBookclubLogic