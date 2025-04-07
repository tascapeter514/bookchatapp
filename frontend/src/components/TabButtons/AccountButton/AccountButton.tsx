import { TabAction, TabState } from "../../../reducers/userTabsReducer"
import { Dispatch } from "react"
import './AccountButton.css'




interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
}



const AccountButton = ({userTabs, dispatchUserTabs} : Props) => {



    return (

        <button 
            className={`tab-button account ${userTabs.activeTab === 'accountTab' ? 'active' : ''}`}
            onClick={() => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'accountTab'})}
        >
            Account
        </button>
        
    )

}

export default AccountButton



