import './CurrentReadButton.css'
import { Dispatch } from 'react'
import { TabAction, TabState } from '../../../reducers/tabsReducer'
import CreatePollModal from '../../Modals/CreatePollModal/CreatePollModal'


interface Props {
    tabs: TabState,
    dispatchTabs: Dispatch<TabAction>
}


const CurrentReadButton = ({dispatchTabs, tabs}: Props) => {

    return(
        <div className="tab-button current-read">
            <a
                className={`current-read-button ${tabs.activeTab === 'currentReadPanel' ? 'active' : ''}` }
                onClick={() => dispatchTabs({type: 'SET_ACTIVE_TAB', payload: 'currentReadPanel'})}
            >
                Current Read
            </a>
            <CreatePollModal />
        </div>
    )

}


export default CurrentReadButton
