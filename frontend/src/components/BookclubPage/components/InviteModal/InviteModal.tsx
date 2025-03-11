import './InviteModal.css'
import { ActiveUser } from '../../../../types'
import { Ref, useState, useEffect } from 'react'
import SearchFilter from '../../../common/SearchFilter/SearchFilter'
import SearchFilterResults from '../../../common/SearchFilterResults/SearchFilterResults'
import Button from '../../../common/Buttons/Button/Button'



interface InviteModalProps {

    closeInviteModal: () => void,
    inviteRef: Ref<HTMLDialogElement>

}


const InviteModal = ({ closeInviteModal, inviteRef }: InviteModalProps) => {


    const [searchValue, setSearchValue] = useState('')
    const [userSearchResults, setUserSearchResults] = useState<ActiveUser[]>([])
    const [selectedUser, setSelectedUser] = useState<number | string>('')

    const handleUserSelection = (id: number | string) => {
        setSelectedUser(id)
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

    }

    console.log('user search results:', userSearchResults)


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
                        selectedElement={selectedUser}

                    >
                        {userSearchResults}

                    </SearchFilterResults>
                    <p></p>
                    
                </article>
            </section>
            <div className="button-wrapper">
                <Button onClick={closeInviteModal}>Cancel</Button>
                <Button onClick={async () => selectedUser && await inviteUser(selectedUser)}>Invite</Button>

            </div>
        </dialog>
    )

}

export default InviteModal