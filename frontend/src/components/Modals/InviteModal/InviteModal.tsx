import './InviteModal.css'
import { ActiveUser } from '../../../../types'
import { Ref, useState, useEffect } from 'react'
import SearchFilter from '../../../Search/SearchFilter/SearchFilter'
import { bookclubData } from '../../../../context/BookclubContext/BookclubContext'
import SearchFilterResults from '../../../Search/SearchFilterResults/SearchFilterResults'
import Button from '../../../Buttons/Button/Button'
import { userContext} from '../../../../context/UserContext/UserContext'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'



interface InviteModalProps {

    closeInviteModal: () => void,
    inviteRef: Ref<HTMLDialogElement>

}


const InviteModal = ({ closeInviteModal, inviteRef }: InviteModalProps) => {

    const { parameters } = bookclubData()
    const { id } = parameters
    const [searchValue, setSearchValue] = useState('')
    const [userSearchResults, setUserSearchResults] = useState<ActiveUser[]>([])
    const [newMemberId, setNewMemberId] = useState<number>(NaN)
    const { activeUser } = userContext()


    const handleUserSelection = (id: number) => {
        setNewMemberId(id)
    }

    useEffect(() => {

        try {
            const socket = new WebSocket('ws://localhost:8000/ws/users')

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === 'get_users') {
                    console.log('all users:', data.users_data)
                    setUserSearchResults(data.users_data)
                }
            }

            socket.onerror = (error) => {
                console.error('Users websocket error:', error)
            }

            socket.onopen = () => console.log('Users websocket connected');
            socket.onclose = () => console.log('Users websocket disconnected');

            return () => socket.close()
            
            
        } catch (err) {
            console.log('Failed to initialize users websocket');
            
        }

    }, [])

    const inviteUser = async (selectedUser: number | string): Promise<void> => { 
        console.log('selected user:', selectedUser)
        
        const invitation = {
            invitation_id: uuidv4(),
            accepted: 0,
            created_at: new Date().toLocaleString(),
            bookclub_id: id,
            invited_by_id: activeUser.id,
            invited_user_id: selectedUser
        }

        axios.post('http://localhost:8000/api/sendInvite', invitation)
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log('Your invitation was not sent', error))

        closeInviteModal()

    }



    return (
        <dialog className='invite-modal' ref={inviteRef}>
            <h3>Invite a user to your bookclub</h3>
            <hr />
            <section className='invite-user-content'>
                <SearchFilter
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <article className='suggested-user-list'>
                    <SearchFilterResults
                        variant='user'
                        searchValue={searchValue}
                        handleSelection={handleUserSelection}
                        selectedElement={newMemberId}

                    >
                        {userSearchResults}

                    </SearchFilterResults>
                    
                    
                </article>
            </section>
            <div className="button-wrapper">
                <Button onClick={closeInviteModal}>Cancel</Button>
                <Button onClick={async () => newMemberId && await inviteUser(newMemberId)}>Invite</Button>

            </div>
        </dialog>
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