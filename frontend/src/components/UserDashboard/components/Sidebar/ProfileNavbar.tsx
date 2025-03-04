import { userData } from '../../../common/UserContext'

import './ProfileNavbar.css'



const ProfileNavbar = () => {

    const { activeUser } = userData()

    console.log('acitve user:', activeUser)

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthIndex = date.getMonth() + 1;


        const day = date.getDate();
        const month = monthNames[monthIndex]
        const year = date.getFullYear()

        return { day, month, year }
    }

    const {day, month, year } = formatDate(activeUser.date_joined)

    

    return(
        <nav className='profile-navbar'>
            <div className="profile-header">
                <h1>Hello {activeUser.first_name}</h1>
                <span>Member since {month} {day}, {year}</span>
            </div>

            <ul className='nav-list'>
                <li className="active">
                    <a href="">Home</a>
                </li>
                

            </ul>
        </nav>
    )
}

export default ProfileNavbar