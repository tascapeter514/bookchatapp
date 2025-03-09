import './MessagePanel.css'
import { Link } from 'react-router-dom'
import { userData } from '../../../common/UserContext.tsx'
import { Invitation} from '../../../../types.ts'
import { formatDate } from '../../../common/functions.tsx'
import Header from '../../../common/Header/Header.tsx'
import SubHeader from '../../../common/SubHeader/SubHeader.tsx'





const MessagePanel = () => {


    const { activeUser, activeUserToken, userInvites, setUserInvites } = userData()

    function joinBookclub(bookclub: {id: string, name: string}) {

        const joinReq = {
            user_id: activeUser.id,
            bookclub_id: bookclub.id
        }

        fetch(`http://localhost:8000/api/acceptInvite`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${activeUserToken}`
            },
            body: JSON.stringify(joinReq)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUserInvites(prev => [...prev, data])
        })
        .catch(err => console.log('There was an error in joining your bookclub:', err))
    }

    const userInvitesElements = userInvites?.map((userInvite: Invitation) => {

        const {day, month, year } = formatDate(userInvite.created_at)


        return(
            <li key={userInvite.invitation_id} className='message-element'>
                <div className="message-header-wrapper">
                    <div className="message-user-wrapper">
                        <div className="message-profile-icon">{userInvite.invited_by.charAt(0).toUpperCase()}</div>
                        <div className="message-user-text">
                            <span className='message-user-span'>{userInvite.invited_by}</span>
                            <span className='message-invitation-span'>has invited you to</span>
                            <Link to={`/bookclub/${userInvite.bookclub.id}`}><span className='message-bookclub-span'>{userInvite.bookclub.name}</span></Link>
                        </div>
                    
                    </div>
                    <span className='message-date-span'>{day} {month} {year}</span>
                </div>
                <div className="message-content">
                    {!userInvite.accepted && (<button className='accept-button' onClick={() => joinBookclub(userInvite.bookclub)}>Accept</button>) }
                </div> 
            </li>
        )
    })



    return(
        <section id='messages' className='messages-container' aria-labelledby='tab-2'>
            <Header>Messages</Header>
            <SubHeader>Invitations</SubHeader>
            <ul className='messages-list'>{userInvitesElements}</ul>
        </section>
    )
}

export default MessagePanel

