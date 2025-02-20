import './BookclubPage.css'
import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import { Bookclub, ActiveUser} from '../../types'
import { userData } from '../../components/common/UserContext'






const BookclubPage : React.FC = () => {

    const { userBookclubs } = userData()
    
    const [isMember, setIsMember] = useState(false)
    const parameters = useParams()

    useEffect(() => {
        setIsMember(isMember => {
            return isMember = userBookclubs.map((userBookclub: Bookclub) => userBookclub.bookclub_id).some(userBookclubId => userBookclubId === parameters.id)
        })
    }, [userBookclubs])
    const [bookclub, setBookclub] = useState<Bookclub | null>(null)
    const [inviteUsers, setInviteUsers] = useState<ActiveUser[]>([])
    const [showInvite, setShowInvite] = useState(false)



    useEffect(() => {
        fetch(`http://localhost:8000/api/bookclub/${parameters.id}`)
        .then(res => res.json())
        .then(data => setBookclub(data))
        .catch(err => console.log('There was an error fetching the following bookclub page', err))
    }, [])


    const bookclubMembers = bookclub?.members.map((member) => {
        return(<li key={member.id}>{member.username}</li>)
    })

    const nonMembers = inviteUsers.map((nonMember) => {
        return(
            <li key={nonMember.id}>
                <label>{nonMember.username} <input name='nonMemberRadio' type="radio" value={nonMember.id} id='nonMemberRadio' /></label>

            </li>
        )

    })


    const getNonMembers = () => {
        setShowInvite(prev => !prev)
        fetch(`http://localhost:8000/api/inviteusers/${bookclub?.bookclub_id}`)
        .then(res => res.json())
        .then(data => setInviteUsers(data))
        .catch(err => console.log('There was an error retrieving users:', err))
    }

    const sendInvite = async (formData: FormData) => {
        console.log('invite form data:', formData)
        const id = formData.get('nonMemberRadio')
        const inviteReq = {
            invited_user_id: id,
            bookclub_id: bookclub?.bookclub_id,
        }

        const token = localStorage.getItem('authToken')
        const parsedToken = token ? JSON.parse(token) : null


        console.log(`Token ${parsedToken}`)
        if (!parsedToken) {
            console.error('No auth token found')
            return
        }

        try {
            const response = await fetch('http://localhost:8000/api/sendInvite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${parsedToken}`
                },
                body: JSON.stringify(inviteReq)
            })

            const data = await response.json()
            console.log('Response from server', data)

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong')
            }
        } catch (error) {
            console.error('Error sending invitation:', error)
        }
        
    }

    return(
            <div className='bookclub-container'>
                {isMember && (
                    <div>
                    <h2>Welcome to the {bookclub?.name}</h2>

                    <aside>
                    
                        <h3>Members</h3>
                        <ul>{bookclubMembers}</ul>
                        <br />
                        <hr />
                        <button onClick={getNonMembers}>Invite Users</button>
                        {showInvite ?
                            <form action={sendInvite as any} className="invite-form" method='post'>
                                <ul>{nonMembers}</ul>
                                <button type='submit'>Submit</button>
                    
                            </form>
                            : ''}
                    
                    </aside>
                    </div>
                )}

                {!isMember && (
                    <div>
                        <h1>We're sorry.</h1>
                        <p>You must be a member to view the book club.</p>
                    </div>
                ) }
                </div>
        
    )
}


export default BookclubPage
