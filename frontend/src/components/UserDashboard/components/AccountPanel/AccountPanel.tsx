import './AccountPanel.css'
import { ActiveUser } from '../../../../types'
import { useState } from 'react'
import { userData } from '../../../common/Context/UserContext/UserContext'
import Header from '../../../common/Header/Header'
import SubHeader from '../../../common/SubHeader/SubHeader'
import Button from '../../../common/Buttons/Button/Button'

const AccountPanel = () => {
    
    const { activeUser } = userData()
    const [user, setUser] = useState<ActiveUser>(activeUser)

    console.log(activeUser)

    return(

        <section id='account' className='account-container' aria-labelledby='tab-3'>
            <Header>Account Details</Header>
            <SubHeader>Contact Info</SubHeader>
            <form action="" className='contact-info-form'>
                <div className="form-field">
                    <label htmlFor="first_name">First Name</label>
                    <input id='first_name' name='first_name' value={user.first_name} />
                </div>
                <div className="form-field">
                    <label htmlFor="last_name">Last Name</label>
                    <input id='last_name' name='last_name'  value={user.last_name} />
                </div>
                <div className="form-field">
                    <label htmlFor="email_address">Email</label>
                    <input id='email_address' name='email_address' value={user.email}  />
                </div>
                <Button>Save Changes</Button>
            </form>
            <SubHeader>Change Password</SubHeader>
            <form action="" className='change-password-form'>
                <div className="form-field">
                    <label htmlFor="current-password">Current Password</label>
                    <input id='current-password' name='current-password'  />
                </div>
                <div className="form-field">
                    <label htmlFor="new_password">New Password</label>
                    <input id='new_password' name='new_password' />
                </div>
                <Button>Save Changes</Button>
            </form>
        </section>
    )
}

export default AccountPanel