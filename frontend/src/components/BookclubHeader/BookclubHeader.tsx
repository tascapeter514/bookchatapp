import { Bookclub } from '../../types'
// import { bookclubData } from '../../../../context/BookclubContext/BookclubContext'
import BookclubBackground from '../../assets/bookclub-background.jpg'
import InviteModal from '../Modals/InviteModal/InviteModal'
import ProfileIcons from '../ProfileIcons/ProfileIcons'
import BookclubAvatar from '../Images/BookclubAvatar/BookclubAvatar'

import './BookclubHeader.css'


interface Props {
    bookclub: Bookclub
}

const BookclubHeader = ({bookclub}: Props) => {

    // const { bookclub, parameters } = bookclubData()
    // const { id } = parameters
    
    
    
   
    console.log('book header bookclub:', bookclub)




    return (
        <div className='bookclub-top-facade'>
            <div className="bookclub-background">
                <div className="bookclub-background-img-wrapper"><img src={BookclubBackground} alt="" /></div>
                <BookclubAvatar id={bookclub?.id}/>
                <div className="bookclub-header-title">
                    <h2>{bookclub?.name}</h2>
                    <small>{bookclub?.members.length} Members</small>
                    <div className="header-members-wrapper">
                        <ul className='user-profile-list' >
                            <ProfileIcons users={bookclub?.members}></ProfileIcons>
                        </ul>
                    </div>
                </div>
            </div>
            <InviteModal bookclubId={bookclub.id} />
                    
            
                

                     {/* TO INVITEMODALWITHBUTTON */}
                    {/* <div className="member-buttons">
                        
                        <Button>Joined</Button>
                    </div>
                     */}
                
           
        </div>

    )
}


export default BookclubHeader