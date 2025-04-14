import { TabAction, TabState } from "../../../reducers/tabsReducer"
import { Dispatch } from "react"
import './AccountButton.css'




interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
}



const AccountButton = ({userTabs, dispatchUserTabs} : Props) => {



    return (

        <a 
            className={`tab-button account ${userTabs.activeTab === 'accountPanel' ? 'active' : ''}`}
            onClick={() => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'accountPanel'})}
        >
            Account
        </a>
        
    )

}

export default AccountButton



