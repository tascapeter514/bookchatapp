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
import { handleLoginError, LoginError } from '../../../utils/errorHandling'
import { useSelector } from 'react-redux'



interface Props {
    bookclubId: number
}


const InviteModal = ({bookclubId}: Props) => {

    const { user } = useSelector((state: RootState) => state.auth)
    const [search, dispatchSearch] = useReducer(searchReducer, {id: 0, value: ''})
    const ref = useRef<HTMLDialogElement>(null)
    const openInviteModal = () => ref.current?.showModal()
    const closeInviteModal = () => ref.current?.close()
    const [inviteUser, {error, isLoading, isError}] = useInviteUserMutation()

    const {results} = useGetUsers(bookclubId)

    const handleInviteUser = async () => {

        try {
            const data = {
                bookclubId: bookclubId,
                inviter: Number(user.id),
                invitee: Number(search.id)
            }

            if (!data) throw new Error('You must select a user to invite');

            const response = await inviteUser(data).unwrap()

            console.log('invite modal fetch response:', response)


    

        } catch (error: any) {
            console.error('There was an error sending your invitation:', error)
        } finally {

            closeInviteModal()
        }

       
    }

    console.log('invite modal resarch:', search)


    return (

        <>
            <Button
                onClick={openInviteModal}
            >
                + Invite
            </Button>
            <dialog className='invite-modal' ref={ref}>
                {isError && <ErrorMessage>{handleLoginError(error as LoginError)}</ErrorMessage>}
                <h3>Invite a user to your bookclub</h3>
                <hr />
                <SearchFilter search={search} dispatchSearch={dispatchSearch}/>
                <UserResults search={search} dispatchSearch={dispatchSearch} results={results ?? []} />
                <div className="button-wrapper">
                    <Button onClick={closeInviteModal}>Cancel</Button>
                    <Button onClick={handleInviteUser}>Invite</Button>

                </div>
            </dialog>
        </>
        
    )

}

export default InviteModal


{/* <button onClick={getNonMembers}>Invite Users</button>
                        {showInvite ?
                            <form action={sendInvite as any} className="invite-form" method='post'>
                                <ul>{nonMembers}</ul>
                                <button type='submit'>Submit</button>
                    
                            </form>
                            : ''} */}



                            // const sendInvite = async (formData: FormData) => {
                            //     console.log('invite form data:', formData)
                            //     const id = formData.get('nonMemberRadio')
                            //     const inviteReq = {
                            //         invited_user_id: id,
                            //         bookclub_id: bookclub?.bookclub_id,
                            //     }
                        
                            //     const token = localStorage.getItem('authToken')
                            //     const parsedToken = token ? JSON.parse(token) : null
                        
                        
                            //     console.log(`Token ${parsedToken}`)
                            //     if (!parsedToken) {
                            //         console.error('No auth token found')
                            //         return
                            //     }
                        
                            //     try {
                            //         const response = await fetch('http://localhost:8000/api/sendInvite', {
                            //             method: 'POST',
                            //             headers: {
                            //                 'Content-Type': 'application/json',
                            //                 'Authorization': `Token ${parsedToken}`
                            //             },
                            //             body: JSON.stringify(inviteReq)
                            //         })
                        
                            //         const data = await response.json()
                            //         console.log('Response from server', data)
                        
                            //         if (!response.ok) {
                            //             throw new Error(data.error || 'Something went wrong')
                            //         }
                            //     } catch (error) {
                            //         console.error('Error sending invitation:', error)
                            //     }
                                
                            // }

                            // const inviteUser = async (selectedUser: number | string): Promise<void> => { 
                            //     console.log('selected user:', selectedUser)
                                
                            //     const invitation = {
                            //         invitation_id: uuidv4(),
                            //         accepted: 0,
                            //         created_at: new Date().toLocaleString(),
                            //         bookclub_id: id,
                            //         invited_by_id: activeUser.id,
                            //         invited_user_id: selectedUser
                            //     }
                        
                            //     axios.post('http://localhost:8000/api/sendInvite', invitation)
                            //         .then(response => {
                            //             console.log(response.data)
                            //         })
                            //         .catch(error => console.log('Your invitation was not sent', error))
                        
                            //     closeInviteModal()
                        
                            // }