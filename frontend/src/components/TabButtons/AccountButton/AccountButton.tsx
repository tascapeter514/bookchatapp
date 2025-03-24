import './AccountButton.css'
import { Dispatch, SetStateAction } from 'react'

interface Props {

    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}


const AccountButton = ({activeTab, setActiveTab}: Props) => {


    return (

        <button 
            className={`account-button ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
        >
            Account
        </button>
        
    )

}

export default AccountButton


{/* <div className="account-button">
            <a
                id='account-button'
                className={`account-button ${activeTab === 0 ? 'active' : ''}`}
                onClick={() => setActiveTab(0)}
                href='#account'
            >
                Account
            </a>
        </div> */}
