import './InviteModal.css'
import { useRef, useReducer } from 'react'
import Button from '../../Buttons/Button/Button'
import SearchFilter from '../../Search/SearchFilter/SearchFilter'
import searchReducer from '../../../reducers/searchReducer'
import UserResults from '../../Search/UserResults/UserResults'
import useGetUsers from '../../../hooks/useGetUsers'
import { useInviteUserMutation } from '../../../slices/bookclubApiSlice'
import { RootState } from '../../../store/store'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { handleInviteError, InviteError } from '../../../utils/errorHandling'
import { useSelector } from 'react-redux'
import CreateInviteButton from '../../Buttons/CreateInviteButton/CreateInviteButton'



interface Props {
    bookclubId: number
}


const InviteModal = ({bookclubId}: Props) => {

    const { user } = useSelector((state: RootState) => state.auth)
    const [search, dispatchSearch] = useReducer(searchReducer, {resultId: 0, value: ''})
    const ref = useRef<HTMLDialogElement>(null)
    const openInviteModal = () => ref.current?.showModal()
    const closeInviteModal = () => ref.current?.close()
    const [inviteUser, {error, isError, reset}] = useInviteUserMutation()

    const {results} = useGetUsers(bookclubId)

    const handleInviteUser = async () => {

        try {
            const data = {
                bookclubId: bookclubId,
                inviter: Number(user.id),
                invitee: Number(search.resultId)
            }

            if (!data) throw new Error('You must select a user to invite');

            const response = await inviteUser(data).unwrap()

            console.log('invite modal fetch response:', response)


    

        } catch (error: any) {
            console.error('There was an error sending your invitation:', error)
        }

       
    }

    console.log('invite modal resarch:', search)


    return (

        <>
            <CreateInviteButton
                onClick={openInviteModal}
            >
               
            </CreateInviteButton>
            <dialog className='invite-modal' ref={ref}>
                {isError && <ErrorMessage>{handleInviteError(error as InviteError)}</ErrorMessage>}
                <h3>Invite a user to your bookclub</h3>
                <hr />
                <SearchFilter search={search} dispatchSearch={dispatchSearch}/>
                <UserResults search={search} dispatchSearch={dispatchSearch} results={results ?? []} />
                <div className="button-wrapper">
                    <Button onClick={() => {closeInviteModal(); reset()}}>Cancel</Button>
                    <Button onClick={handleInviteUser}>Invite</Button>
                </div>
            </dialog>
        </>
        
    )

}

export default InviteModal
