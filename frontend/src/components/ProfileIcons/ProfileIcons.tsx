import './ProfileIcons.css'
import { ActiveUser } from '../../types'



interface ProfileIconProps {
    users: ActiveUser[] | undefined
}


const ProfileIcons = ( {users}: ProfileIconProps ) => {

       return (
            <ul className='user-profile-list'>
                {users?.map((user, index) => (
                    <li key={user.id} >
                        <div 
                            className="circle" 
                            style={{ marginLeft: `${index - 15}px`,
                                    zIndex: index + 1, 
                                    position: 'relative', 
                                    backgroundColor: '#FF8C00',
                                    border: '2px solid white'
                                }}
                    >
                        {user?.username?.charAt(0).toUpperCase()}</div>
                    </li>
                ))}
            </ul>
       )
}

export default ProfileIcons


