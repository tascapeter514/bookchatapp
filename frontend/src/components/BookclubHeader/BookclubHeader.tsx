import { useRef } from 'react'
// import { bookclubData } from '../../../../context/BookclubContext/BookclubContext'
import BookclubBackground from '../../assets/bookclub-background.jpg'
import FileUploadModal from '../Modals/FileUploadModal/FileUploadModal'
import InviteModal from '../BookclubPage/components/InviteModal/InviteModal'
import ProfileIcons from '../ProfileIcons/ProfileIcons'
import Button from '../Buttons/Button/Button'

import './BookclubHeader.css'




const BookclubHeader = () => {

    // const { bookclub, parameters } = bookclubData()
    // const { id } = parameters
    const uploadFileRef = useRef<HTMLDialogElement>(null)
    const inviteRef = useRef<HTMLDialogElement>(null)
    const openImageModal = () => uploadFileRef.current?.showModal()
    const closeImageModal = () => uploadFileRef.current?.close()
    const openInviteModal = () => inviteRef.current?.showModal()
    const closeInviteModal = () => inviteRef.current?.close()




    return (
        <div className='bookclub-top-facade'>
            <div className="bookclub-background">
            <img src={BookclubBackground} alt="" />
                <Button onClick={openImageModal}>Change Image</Button>
                {/* <FileUploadModal id={id ?? ''} closeImageModal={closeImageModal} uploadFileRef={uploadFileRef} /> */}
            </div>
            {/* <div className="bookclub-top-bar">
                <h2>{bookclub?.name}</h2>
                                
                <small>{bookclub?.members.length} Members</small>
                <div className="header-members-wrapper">
                    <ul className='user-profile-list' >
                        <ProfileIcons users={bookclub?.members}></ProfileIcons>
                    </ul>
                    <div className="member-buttons">
                        <Button
                            onClick={openInviteModal}
                        >+ Invite</Button>
                        <Button>Joined</Button>
                    </div>
                    <InviteModal
                        closeInviteModal={closeInviteModal}
                        inviteRef={inviteRef}
                    ></InviteModal>
                </div>
            </div> */}
        </div>

    )
}


export default BookclubHeader