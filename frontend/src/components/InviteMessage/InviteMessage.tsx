import './InviteMessage.css'
import { formatDate } from '../functions'
import { Invitation } from '../../types'
import Button from '../Buttons/Button/Button'
import { Link } from 'react-router-dom'


interface Props {
    invitation: Invitation
}


const InviteMessage = ({invitation}: Props) => {

    const {day, month, year } = formatDate(invitation.created_at)

    return(
        <li className='message-element'>
            <div className="message-content">
                <div className="message-text">
                    <div className="message-profile-icon">
                        {invitation.inviter.charAt(0).toUpperCase()}
                    </div>
                    <div className="message-main-text">
                        <span className='message-inviter'>{invitation.inviter}</span>
                        <span className='message-invitation-span'>has invited you to</span>
                        <Link to={`/bookclub/${invitation.bookclub.id}`}>
                            <span className='message-bookclub-link'>
                                {invitation.bookclub.name}
                            </span>
                        </Link>
                    </div>
                </div>
                <span className='message-date'>
                    {day} {month} {year}
                </span>
            </div>
            <div className="message-buttons">
                {!invitation.accepted && (<Button>Accept</Button>) }
                {!invitation.accepted && (<Button>Decline</Button>) }
            </div> 
        </li>

    )
}

export default InviteMessage