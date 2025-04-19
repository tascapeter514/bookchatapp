import './CurrentReadButton.css'
import { Dispatch } from 'react'
import { Book } from '../../../types'
import { TabAction, TabState } from '../../../reducers/tabsReducer'
import CreatePollModal from '../../Modals/CreatePollModal/CreatePollModal'


interface Props {
    tabs: TabState,
    dispatchTabs: Dispatch<TabAction>,
    books: Book[]
}


const CurrentReadButton = ({dispatchTabs, tabs, books}: Props) => {

    return(
        <div className="tab-button current-read">
            <a
                className={`current-read-button ${tabs.activeTab === 'currentReadPanel' ? 'active' : ''}` }
                onClick={() => dispatchTabs({type: 'SET_ACTIVE_TAB', payload: 'currentReadPanel'})}
            >
                Current Read
            </a>
            <CreatePollModal books={books}/>
        </div>
    )

}


export default CurrentReadButton
