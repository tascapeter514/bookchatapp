import './AccountButton.css'
import { Dispatch, SetStateAction } from 'react'
import { userContext } from '../../common/Context/UserContext/UserContext'

interface Props {

    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}


const AccountButton = ({activeTab, setActiveTab}: Props) => {

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



