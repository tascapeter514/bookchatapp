import { useRef } from 'react'
import { Bookclub } from '../../types'
// import { bookclubData } from '../../../../context/BookclubContext/BookclubContext'
import BookclubBackground from '../../assets/bookclub-background.jpg'
import InviteModal from '../BookclubPage/components/InviteModal/InviteModal'
import ProfileIcons from '../ProfileIcons/ProfileIcons'
import BookclubAvatar from '../Images/BookclubAvatar/BookclubAvatar'

import './BookclubHeader.css'


interface Props {
    bookclub: Bookclub
}

const BookclubHeader = ({bookclub}: Props) => {

    // const { bookclub, parameters } = bookclubData()
    // const { id } = parameters
    
    const inviteRef = useRef<HTMLDialogElement>(null)
    
    const openInviteModal = () => inviteRef.current?.showModal()
    const closeInviteModal = () => inviteRef.current?.close()
    console.log('book header bookclub:', bookclub)




    return (
        <div className='bookclub-top-facade'>
            <div className="bookclub-background">
                <div className="bookclub-background-img-wrapper"><img src={BookclubBackground} alt="" /></div>
                <BookclubAvatar />
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
            
                

                     {/* TO INVITEMODALWITHBUTTON */}
                    {/* <div className="member-buttons">
                        <Button
                            onClick={openInviteModal}
                        >+ Invite</Button>
                        <Button>Joined</Button>
                    </div>
                    <InviteModal
                        closeInviteModal={closeInviteModal}
                        inviteRef={inviteRef}
                    ></InviteModal> */}
                
           
        </div>

    )
}


export default BookclubHeader