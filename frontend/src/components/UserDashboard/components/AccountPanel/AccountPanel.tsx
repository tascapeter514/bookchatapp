import './AccountPanel.css'
import { userData } from '../../../common/UserContext'







const AccountPanel: React.FC = () => {
    
    const { activeUser } = userData()

    console.log('settings active user:', activeUser)



    return(

        <div id='account' className='account-container' aria-labelledby='tab-3'>
            <h1>Account Details</h1>
            <hr className="underline" />
            <h2>Contact Info</h2>
            <form action="" className='contact-info-form'>
                <div className="form-field">
                    <label htmlFor="first_name">First Name</label>
                    <input id='first_name' name='first_name' value={activeUser.first_name} />
                </div>
                <div className="form-field">
                    <label htmlFor="last_name">Last Name</label>
                    <input id='last_name' name='last_name'  value={activeUser.last_name} />
                </div>
                <div className="form-field">
                    <label htmlFor="email_address">Email</label>
                    <input id='email_address' name='email_address' value={activeUser.email}  />
                </div>
                <button>Save Changes</button>
            </form>
            <h2>Change Password</h2>
            <form action="" className='change-password-form'>
                <div className="form-field">
                    <label htmlFor="current-password">Current Password</label>
                    <input id='current-password' name='current-password'  />
                </div>
                <div className="form-field">
                    <label htmlFor="new_password">New Password</label>
                    <input id='new_password' name='new_password' />
                </div>
                <button>Save Changes</button>
            </form>
        </div>
    )
}

export default AccountPanel