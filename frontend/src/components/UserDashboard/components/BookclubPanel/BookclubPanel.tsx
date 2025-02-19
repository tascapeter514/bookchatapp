import './BookclubPanel.css'
import { Link } from 'react-router-dom'
import { userData } from '../../../common/UserContext.tsx'
import { Invitation} from '../../../../types.ts'





const BookclubPanel: React.FC = () => {


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