import './AccountPanel.css'
import { useState, ChangeEvent} from 'react'
import { userContext} from '../../../common/Context/UserContext/UserContext'
import Header from '../../../common/Header/Header'
import SubHeader from '../../../common/SubHeader/SubHeader'
import Button from '../../../common/Buttons/Button/Button'

const AccountPanel = () => {
    
    const { userState } = userContext()



   
    const [contact, setContact] = useState({
        userId: userState.user?.id || '',
        firstName: userState.user?.firstName || '',
        lastName: userState.user?.lastName || '',
        emailAddress: userState.user?.emailAddress || ''
    })

    const [passwordInfo, setPasswordInfo] = useState({
        userId: userState.user?.id,
        currentPassword: '',
        newPassword: ''
    })

    function handleChangeContact(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setContact(prevContact => ({
            ...prevContact,
            [name]: value
            
        }))
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setPasswordInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    

    return(
        // action={changeContact as any}
        // action={changePassword as any}
        <section id='account' className='account-container' aria-labelledby='tab-3'>
            <Header>Account Details</Header>
            <SubHeader>Contact Info</SubHeader>
            <form  className='contact-info-form'>
                <input type="hidden" name='userId' value={contact.userId} />
                <div className="form-field">
                    <label htmlFor="first_name">First Name</label>
                    <input id='first_name' name='firstName' value={contact.firstName} onChange={handleChangeContact}/>
                </div>
                <div className="form-field">
                    <label htmlFor="last_name">Last Name</label>
                    <input id='last_name' name='lastName'  value={contact.lastName} onChange={handleChangeContact} />
                </div>
                <div className="form-field">
                    <label htmlFor="email_address">Email</label>
                    <input id='email_address' name='emailAddress' value={contact.emailAddress} onChange={handleChangeContact} />
                </div>
                <Button type='submit'>Save Changes</Button>
            </form>
            <SubHeader>Change Password</SubHeader>
            <form  className='change-password-form'>
            <input type="hidden" name='userId' value={passwordInfo.userId} />
                <div className="form-field">
                    <label htmlFor="current-password">Current Password</label>
                    <input
                        type='password' 
                        id='current-password' 
                        name='currentPassword' 
                        value={passwordInfo.currentPassword} 
                        onChange={handlePasswordChange} 
                        required/>

                </div>
                <div className="form-field">
                    <label htmlFor="new_password">New Password</label>
                    <input
                        type='password'  
                        id='new_password' 
                        name='newPassword' 
                        value={passwordInfo.newPassword} 
                        onChange={handlePasswordChange} />
                </div>
                <Button type='submit'>Save Changes</Button>
            </form>
        </section>
    )
}

export default AccountPanel
