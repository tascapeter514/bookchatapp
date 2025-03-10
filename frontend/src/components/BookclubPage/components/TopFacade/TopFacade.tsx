import { useRef } from 'react'
import { Bookclub } from '../../../../types'
import BookclubBackground from '../../assets/bookclub-background.jpg'
import FileUploadModal from '../../../common/Modals/FileUploadModal/FileUploadModal'
import ProfileIcons from '../../../common/ProfileIcons/ProfileIcons'
import Button from '../../../common/Buttons/Button/Button'

import './TopFacade.css'


interface TopFacadeProps {
    bookclub: Bookclub | null,
    id: string | undefined
}

const TopFacade = ({bookclub, id}: TopFacadeProps) => {


    const uploadFileRef = useRef<HTMLDialogElement>(null)
    const openImageModal = () => uploadFileRef.current?.showModal()
    const closeImageModal = () => uploadFileRef.current?.close()




    return (
        <div className='bookclub-top-facade'>
            <div className="bookclub-background">
            <img src={BookclubBackground} alt="" />
                <Button onClick={openImageModal}>Change Image</Button>
                <FileUploadModal id={id ?? ''} closeImageModal={closeImageModal} uploadFileRef={uploadFileRef} />
            </div>
            <div className="bookclub-top-bar">
                <h2>{bookclub?.name}</h2>
                                
                <small>{bookclub?.members.length} Members</small>
                <div className="header-members-wrapper">
                    <ul className='user-profile-list' >
                        <ProfileIcons users={bookclub?.members}></ProfileIcons>
                    </ul>
                    <div className="member-buttons">
                        <Button>+ Invite</Button>
                        <Button>Joined</Button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default TopFacade