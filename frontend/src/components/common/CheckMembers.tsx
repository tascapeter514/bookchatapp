import { ReactNode } from 'react'
import { userData } from './Context/UserContext/UserContext'
import { bookclubData } from './Context/BookclubContext/BookclubContext'



type CheckMemberProps = { children: ReactNode }

const CheckMembers = ({ children } : CheckMemberProps) => {

    const { activeUser} = userData()
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
