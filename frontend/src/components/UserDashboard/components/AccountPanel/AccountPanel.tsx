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
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div className="form-field">
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
                <div className="form-field">
                    <label htmlFor=""></label>
                    <input type="text" />
                </div>
            </form>
        </div>
    )
}

export default AccountPanel