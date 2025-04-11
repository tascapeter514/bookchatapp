import './InviteModal.css'
import { useRef, useState, useReducer } from 'react'
import Button from '../../Buttons/Button/Button'
import SearchFilter from '../../Search/SearchFilter/SearchFilter'
import searchReducer from '../../../reducers/searchReducer'
import UserResults from '../../Search/UserResults/UserResults'





const InviteModal = () => {


    const [search, dispatchSearch] = useReducer(searchReducer, {id: 0, value: ''})
    const ref = useRef<HTMLDialogElement>(null)
    const openInviteModal = () => ref.current?.showModal()
    const closeInviteModal = () => ref.current?.close()
    


  



    return (

        <>
            <Button
                onClick={openInviteModal}
            >
                + Invite
            </Button>
            <dialog className='invite-modal' ref={ref}>
                <h3>Invite a user to your bookclub</h3>
                <hr />
                <section className='invite-user-content'>
                    <SearchFilter search={search} dispatchSearch={dispatchSearch}/>
                    <article className='suggested-user-list'>
                        <UserResults />

                        
                        
                        
                    </article>
                </section>
                <div className="button-wrapper">
                    <Button onClick={closeInviteModal}>Cancel</Button>
                    {/* <Button onClick={async () => newMemberId && await inviteUser(newMemberId)}>Invite</Button> */}

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


                            // useEffect(() => {

                            //     try {
                            //         const socket = new WebSocket('ws://localhost:8000/ws/users')
                        
                            //         socket.onmessage = (event) => {
                            //             const data = JSON.parse(event.data)
                            //             if (data.type === 'get_users') {
                            //                 console.log('all users:', data.users_data)
                            //                 setUserSearchResults(data.users_data)
                            //             }
                            //         }
                        
                            //         socket.onerror = (error) => {
                            //             console.error('Users websocket error:', error)
                            //         }
                        
                            //         socket.onopen = () => console.log('Users websocket connected');
                            //         socket.onclose = () => console.log('Users websocket disconnected');
                        
                            //         return () => socket.close()
                                    
                                    
                            //     } catch (err) {
                            //         console.log('Failed to initialize users websocket');
                                    
                            //     }
                        
                            // }, [])
                        
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