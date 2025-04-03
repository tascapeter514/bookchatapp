import { ReactNode } from 'react'
import { userContext } from '../context/UserContext/UserContext'
import { bookclubData } from '../../context/BookclubContext/BookclubContext'



type CheckMemberProps = { children: ReactNode }

const CheckMembers = ({ children } : CheckMemberProps) => {

    const { activeUser} = userContext()
    const { bookclub } = bookclubData()

    const isMember = bookclub.members.some((member) => member.id === activeUser.id)

    if (isMember) {
        return <>{children}</>
    } else {
        return  <div>
                    <h1>We're sorry.</h1>
                    <p>You must be a member to view this book club.</p>
                </div>
    }
}

export default CheckMembers
