import './SettingsPanel.css'
import {ActiveUser} from '../../../../types'



interface SettingsPanelProps {
    user: ActiveUser
}



const SettingsPanel: React.FC<SettingsPanelProps> = ({user}) => {
    return(

        <div id='settings' aria-labelledby='tab-3'>
            <p>{ user.username }</p>
        </div>
    )
}

export default SettingsPanel