import './AccountPanel.css'
import { useState, ChangeEvent} from 'react'
import { userData } from '../../../common/Context/UserContext/UserContext'
import Header from '../../../common/Header/Header'
import SubHeader from '../../../common/SubHeader/SubHeader'
import Button from '../../../common/Buttons/Button/Button'

const AccountPanel = () => {
    
    const { activeUser, updateContact } = userData()

    console.log('active user:', activeUser)

   
    const [contact, setContact] = useState({
        userId: activeUser.id || '',
        firstName: activeUser.first_name || '',
        lastName: activeUser.last_name || '',
        emailAddress: activeUser.email || ''
    })


    function handleChangeContact(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setContact(prevContact => ({
            ...prevContact,
            [name]: value
            
        }))

        console.log('change contact event:', event)
    }

    // console.log('contact info:', contact)
    

    return(

        <section id='account' className='account-container' aria-labelledby='tab-3'>
            <Header>Account Details</Header>
            <SubHeader>Contact Info</SubHeader>
            <form action={updateContact as any} className='contact-info-form'>
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
            <form action="" className='change-password-form'>
                <div className="form-field">
                    <label htmlFor="current-password">Current Password</label>
                    <input id='current-password' name='currentPassword' value={activeUser.password} />
                </div>
                <div className="form-field">
                    <label htmlFor="new_password">New Password</label>
                    <input id='new_password' name='newPassword' />
                </div>
                <Button>Save Changes</Button>
            </form>
        </section>
    )
}

export default AccountPanel
