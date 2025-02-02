import './UserDashboard.css'
import { FC } from 'react'
import { CurrentUser } from '../../types'

interface dashProps {
    user: CurrentUser | null
}

const UserDashboard: FC<dashProps> = ({user}) => {
    return(
        <div>
            Welcome to the dashboard {user ? user.user['username'] : ''}
        </div>
    )
}

export default UserDashboard