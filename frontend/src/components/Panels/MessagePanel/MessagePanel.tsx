import './MessagePanel.css'
import { Link } from 'react-router-dom'
import { Invitation } from '../../../types.ts'
import { formatDate } from '../../functions.tsx'
import Header from '../../Header/Header.tsx'
import SubHeader from '../../SubHeader/SubHeader.tsx'


interface Props {
    invitations: Invitation[]
}


const UserMessages = ({invitations}: Props) => {

    return(
        <ul className='messages-list'>
            {invitations?.map((invite: Invitation) => {
                const {day, month, year } = formatDate(invite.created_at)
                return(
                    <li key={invite.id} className='message-element'>
                        <div className="message-header-wrapper">
                            <div className="message-user-wrapper">
                                <div className="message-profile-icon">
                                    {invite.invited_by.charAt(0).toUpperCase()}
                                </div>
                                <div className="message-user-text">
                                    <span className='message-user-span'>{invite.invited_by}</span>
                                    <span className='message-invitation-span'>has invited you to</span>
                                    <Link to={`/bookclub/${invite.bookclub.id}`}>
                                        <span className='message-bookclub-span'>
                                            {invite.bookclub.name}
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <span className='message-date-span'>
                                {day} {month} {year}
                            </span>
                        </div>
                        <div className="message-content">
                        {/* REMOVED ONCLICK HANDLER UNTIL FETCH LOGIC IS IMPLEMENTED */}
                        {!invite.accepted && (<button className='accept-button' >Accept</button>) }
                        </div> 
                    </li>
                )
            })}
        </ul>

    )

}

const MessagePanel = ({invitations}: Props) => {


    return(
        <section id='messages' className='messages-container' aria-labelledby='tab-2'>
            <Header>Messages</Header>
            <SubHeader>Invitations</SubHeader>
            <UserMessages invitations={invitations} />
            
        </section>
    )
}

export default MessagePanel


 // function joinBookclub(bookclub: {id: string, name: string}) {

    //     const joinReq = {
    //         user_id: activeUser.id,
    //         bookclub_id: bookclub.id
    //     }

    //     fetch(`http://localhost:8000/api/acceptInvite`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${activeUserToken}`
    //         },
    //         body: JSON.stringify(joinReq)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         setUserInvites(prev => [...prev, data])
    //     })
    //     .catch(err => console.log('There was an error in joining your bookclub:', err))
    // }

