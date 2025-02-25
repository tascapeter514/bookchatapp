import './BookclubPage.css'
import {useState, useEffect, FC} from 'react'
import {useParams } from 'react-router-dom'
import { Bookclub, ActiveUser} from '../../types'
import { userData } from '../../components/common/UserContext'
import BookclubBackground from './assets/bookclub-background.jpg'









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

    
    const UserProfileIcons = bookclub?.members.map((member, index) => {
        console.log(bookclub.members)

        const getRandomColor = (index: number) => {
            const colors = ["#FF6347", "#FFA07A", "#FF8C00", "#FA8072", "8B0000", "#8B0000"]
            return colors[index]

        }

        return (
            <li key={index} >
                <div 
                    className="circle" 
                    style={{ marginLeft: `${index - 15}px`,
                                zIndex: index + 1, 
                                position: 'relative', 
                                backgroundColor: '#FF8C00',
                                border: '2px solid white'
                            }}
                    >{member?.username?.charAt(0).toUpperCase()}</div>
            </li>
            

        )
            
        
        
    })



    




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

    console.log('bookclubs:', bookclub)

    





    return(
            <div className='bookclub-container'>
                {isMember && (
                    <div className='bookclub-top-facade'>
                        <div className="bookclub-background">
                            <img src={BookclubBackground} alt="" />
                        </div>
                        <div className="bookclub-top-bar">
                            <h2>{bookclub?.name}</h2>
                            <small>{bookclub?.members.length} Members</small>
                            <div className="header-members-wrapper">
                                <ul className='user-profile-list' >
                                    {UserProfileIcons} 
                                </ul>
                                <button>+ Invite</button>
                            </div> 
                        </div>
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


{/* <button onClick={getNonMembers}>Invite Users</button>
                        {showInvite ?
                            <form action={sendInvite as any} className="invite-form" method='post'>
                                <ul>{nonMembers}</ul>
                                <button type='submit'>Submit</button>
                    
                            </form>
                            : ''} */}