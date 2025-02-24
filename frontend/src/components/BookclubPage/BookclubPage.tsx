import './BookclubPage.css'
import {useState, useEffect, FC} from 'react'
import {useParams } from 'react-router-dom'
import { Bookclub, ActiveUser} from '../../types'
import { userData } from '../../components/common/UserContext'
import BookclubBackground from './assets/bookclub-background.jpg'
import { FaCircleUser } from 'react-icons/fa6'




type UserProfileIconProps = React.ComponentPropsWithoutRef<'svg'>

const UserProfileIcon: FC<UserProfileIconProps> = (props) => {
    return  <FaCircleUser size={32} className='userprofile-icon' {...props} />
}




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


    const UserProfileElements = bookclub?.members.map(() => {
        return (
            <li>
                <UserProfileIcon></UserProfileIcon>
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
                            <ul className='user-profile-list' style={{gridTemplateColumns: `repeat(${bookclub?.members.length}, 32px)`}}>
                                {UserProfileElements}
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