import './BookclubPanel.css'
import { Link } from 'react-router-dom'
import { Invitation, ActiveUser, Bookclub} from '../../../../types.ts'

interface BookclubPanelProps {
    user: ActiveUser,
    userInvites: Invitation[],
}



const BookclubPanel: React.FC<BookclubPanelProps> = ({user, userInvites}) => {


    


    function joinBookclub(bookclub: {id: string, name: string}) {

        const token = localStorage.getItem('authToken')
        const parsedToken = token ? JSON.parse(token) : null

        const joinReq = {
            user_id: user.id,
            bookclub_id: bookclub.id
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

    const userInvitesElements = userInvites?.map((userInvite: Invitation) => {
        return(
            <li key={userInvite.invitation_id}>
                <p>{userInvite.invited_by} has invited you to join <Link to={`/bookclub/${userInvite.bookclub.id}`}>{userInvite.bookclub.name}</Link></p>
                {!userInvite.accepted && (<button onClick={() => joinBookclub(userInvite.bookclub)}>Join</button>) }
                <br />
            </li>
        )
    })



    return(
        <div id='bookclubs' aria-labelledby='tab-2'>
            <h2>Bookclubs</h2>
            <ul>{userInvitesElements}</ul>
        </div>
    )
}

export default BookclubPanel