import './MessagePanel.css'
import { Invitation } from '../../../types.ts'
import Header from '../../Headers/Header/Header.tsx'
import SubHeader from '../../Headers/SubHeader/SubHeader.tsx'
import InviteMessage from '../../InviteMessage/InviteMessage.tsx'
import WithAcceptDeclineLogic from '../../HigherOrderComponents/WithAcceptDeclineLogic.tsx'



interface Props {
    invitations: Invitation[]
}

const InviteMessageWithLogic = WithAcceptDeclineLogic(InviteMessage)


const InviteMessages = ({invitations}: Props) => {

    return(
        <ul className='messages-list'>
            {invitations?.map((invitation: Invitation) => {
                return(
                    <InviteMessageWithLogic invitation={invitation} key={invitation.id}/>
                )
            })}
        </ul>

    )

}

const MessagePanel = ({invitations}: Props) => {


    return(
        <section id='messages' className='messages-container' aria-labelledby='tab-2'>
            <Header>Messages</Header>
            <SubHeader>Invitations</SubHeader>
            <InviteMessages invitations={invitations} />
            
        </section>
    )
}

export default MessagePanel


 // function joinBookclub(bookclub: {id: string, name: string}) {

    //     const joinReq = {
    //         user_id: activeUser.id,
    //         bookclub_id: bookclub.id
    //     }

    //     fetch(`http://localhost:8000/api/acceptInvite`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${activeUserToken}`
    //         },
    //         body: JSON.stringify(joinReq)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data)
    //         setUserInvites(prev => [...prev, data])
    //     })
    //     .catch(err => console.log('There was an error in joining your bookclub:', err))
    // }

