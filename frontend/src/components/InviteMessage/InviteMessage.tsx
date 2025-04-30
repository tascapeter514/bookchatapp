import './InviteMessage.css'
import { formatDate } from '../functions'
import { Invitation } from '../../types'
import Button from '../Buttons/Button/Button'
import { Link } from 'react-router-dom'


interface Props {
    invitation: Invitation
}


const InviteMessage = ({invitation}: Props) => {
    const {day, month, year } = formatDate(invite.created_at)
    return(
        <li key={invitation.id} className='message-element'>
            <div className="message-header-wrapper">
                <div className="message-user-wrapper">
                    <div className="message-profile-icon">
                                    {invitation.inviter.charAt(0).toUpperCase()}
                    </div>
                    <div className="message-user-text">
                        <span className='message-user-span'>{invitation.inviter}</span>
                        <span className='message-invitation-span'>has invited you to</span>
                        <Link to={`/bookclub/${invitation.bookclub.id}`}>
                            <span className='message-bookclub-span'>
                                {invitation.bookclub.name}
                            </span>
                        </Link>
                    </div>
                </div>
                <span className='message-date-span'>
                    {day} {month} {year}
                </span>
            </div>
            <div className="message-content">
            {!invitation.accepted && (<Button>Accept</Button>) }
            {!invitation.accepted && (<Button>Decline</Button>) }
            </div> 
        </li>

    )
}

export default InviteMessage