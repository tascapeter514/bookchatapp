import './AccountButton.css'
import { userContext } from '../../common/Context/UserContext/UserContext'



const AccountButton = () => {

    const {userTabs, tabsDispatch} = userContext()



    return (

        <button 
            className={`account-button ${userTabs.activeTab === 'accountTab' ? 'active' : ''}`}
            onClick={() => tabsDispatch({type: 'SET_ACTIVE_TAB', payload: 'accountTab'})}
        >
            Account
        </button>
        
    )

}

export default AccountButton



