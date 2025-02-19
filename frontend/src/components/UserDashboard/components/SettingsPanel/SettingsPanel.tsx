import './SettingsPanel.css'
import { userData } from '../../../common/UserContext'







const SettingsPanel: React.FC = () => {
    
    const { activeUser } = userData()

    console.log('settings active user:', activeUser)



    return(

        <div id='settings' aria-labelledby='tab-3'>
            <p>{ activeUser.username }</p>
        </div>
    )
}

export default SettingsPanel