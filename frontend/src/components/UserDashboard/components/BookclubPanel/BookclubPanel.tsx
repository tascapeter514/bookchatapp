import './BookclubPanel.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Invitation, ActiveUser, Bookclub} from '../../../../types.ts'

interface BookclubPanelProps {
    user: ActiveUser
}



const BookclubPanel: React.FC<BookclubPanelProps> = ({user}) => {


    const [invitations, setInvitations] = useState<Invitation[]>([])


    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const parsedToken = token ? JSON.parse(token) : null
   
        fetch(`http://localhost:8000/api/getInvites/${user.id}`, {
            headers: {
                'Authorization': `Token ${parsedToken}`
            }
            
        })
        .then(res => res.json())
        .then(data => setInvitations(data))
        .catch(err => console.log('there was an error retrieving the invites:', err))
    }, [])

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/bookchat/joinBookclub');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.type === 'join_bookclub') {

                setInvitations(prevInvitations => {
                    const updated = prevInvitations.map(invitation => {
                        if(invitation.bookclub_to_join.bookclub_id === data.bookclub_id) {
                            return {
                                ...invitation,
                                bookclub_to_join: {
                                    ...invitation.bookclub_to_join,
                                    members: data.updated_members
                                },
                            };
                        }
                        return invitation;
                    })


                        return [...updated]

                })
                

            }
        }
        socket.onopen = () => console.log('Web socket connected')
        socket.onclose = () => console.log('Web socket disconnected')

        return () => socket.close();                       
    }, [])

    function joinBookclub(bookclub: Bookclub) {

        const token = localStorage.getItem('authToken')
        const parsedToken = token ? JSON.parse(token) : null

        const joinReq = {
            user_id: user.id,
            bookclub_id: bookclub.bookclub_id
        }

        fetch(`http://localhost:8000/api/acceptInvite`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${parsedToken}`
            },
            body: JSON.stringify(joinReq)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log('There was an error in joining your bookclub:', err))
    }


    const invitationElements = invitations?.map((invitation: Invitation & {isMember?: boolean}) => {
        const bookclub = invitation['bookclub_to_join']
        const memberIds = bookclub['members'].map((member) => member['id'])
        const invited_by_user = invitation['invited_by_user']
        const isMember = invitation.isMember ?? memberIds.includes(user.id)
        return(
                <li key={invitation.invitation_id}>
                    {isMember ? 
                        <Link to={`/bookclub/${bookclub.bookclub_id}`}><h3>{bookclub.name}</h3></Link>
                        : <h3>{bookclub.name}</h3> }
                    <p>{invited_by_user.username}</p>


                    {!isMember && (
                        <button onClick={() => joinBookclub(bookclub)}>Join</button>

                    )}
                </li>
            
        )
    })

    console.log('invites:', invitations)



    return(
        <div id='bookclubs' aria-labelledby='tab-2'>
            <h2>Bookclubs</h2>
            <ul>{invitationElements}</ul>
        </div>




    )
}

export default BookclubPanel