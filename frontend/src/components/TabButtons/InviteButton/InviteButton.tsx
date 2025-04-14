import './InviteButton.css'
import { Bookclub } from '../../../types'
import ProfileIcons from '../../ProfileIcons/ProfileIcons'
import InviteModal from '../../Modals/InviteModal/InviteModal'


interface Props {
    bookclub: Bookclub
}


const InviteButton = ({bookclub}: Props) => {

    return(

        <div className='tab-button invite'>

            
            <div className="header-members-wrapper">
                <h3 className='invite-button-header'>{bookclub?.members.length} {bookclub?.members.length == 1 ? 'Member' : 'Members'}</h3>
                <ProfileIcons users={bookclub?.members} />
                
            </div>
            <InviteModal bookclubId={bookclub.id} />
        
        </div>

        

    )

}

export default InviteButton