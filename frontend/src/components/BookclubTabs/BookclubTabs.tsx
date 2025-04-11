import './BookclubTabs.css'
import { Dispatch, useReducer } from 'react'
import { TabState, TabAction } from '../../reducers/tabsReducer'
import { Bookshelf } from '../../types'
import BookshelfButtons from '../BookshelfButtons/BookshelfButtons'
import dropdownReducer from '../../reducers/dropdownReducer'
import { RightDropDownIcon } from '../Icons'



// type TabContent = {name: string, id: number}

interface TabProps {
    bookclubTabs: TabState,
    dispatchTabs: Dispatch<TabAction>,
}

interface Props {
    dispatchTabs: Dispatch<TabAction>
}


const BookshelfButton = ({ dispatchTabs}: TabProps) => {

    const [dropdown, dispatchDropdown] = useReducer(dropdownReducer, {activePanel: false, isRotated: false})

    return(
        <a 
            className='bookshelf-tab' 
            href={'#bookshelf'} 
            onClick={() => dispatchTabs({type:'SHOW_NAV'})}
        >
            Bookshelves
            <RightDropDownIcon 
                aria-controls='bookshelves-subnav'
                aria-expanded={dropdown.activePanel}
                onClick={() => dispatchDropdown({type: 'TOGGLE_DROPDOWN'})}
                dropdown={dropdown}
            >
            </RightDropDownIcon>
        </a>

    )

}

const CurrentReadButton = ({dispatchTabs}: Props) => {

    return(
        <a 
            className='current-read-tab' 
            href={'#currentRead'} 
            onClick={() => dispatchTabs({type: 'SET_ACTIVE_TAB', payload: 'bookshelfTab'})}
        >
            Current Read
        </a>
    )

}




const BookclubTabs = ({ bookclubTabs, dispatchTabs }: TabProps) => {

    
    return(

        <div className="tabs-container">
            <BookshelfButton bookclubTabs={bookclubTabs} dispatchTabs={dispatchTabs}/>
            {/* <CurrentReadButton dispatchTabs={dispatchTabs} />   */}
        </div>





    )

}

export default BookclubTabs

// const tabElements = contents?.map((tabContent: {name: string, id: number}) => {



//     return (
//         <ul className='tabs-list'>
//             {tabContent.name === 'Bookshelves' && (


//                 <li 
//                     key={tabContent.id}
//                     // onClick={() => setActiveTab(tabContent.id)}
//                     // className={activeTab === tabContent.id ? 'active': ''}
//                 >
//                     <a 
//                         id={`tab-${tabContent.id}`} 
//                         href={`#${tabContent.name.toLowerCase()}`}
//                     >
//                         {tabContent.name}
//                         {/* <RightDropDownIcon 
//                             aria-controls='bookshelves-subnav'
//                             aria-expanded={showSubNav}
//                             onClick={toggleDropdown}
//                             isRotated={isRotated}
//                         >

//                         </RightDropDownIcon> */}

//                     </a>
                    
//                 </li>
//             )}

//             {tabContent.name !== 'Bookshelves' && 
//                 <li key={tabContent.id}                 
//                     // onClick={toggleTab}
//                     // className={activeTab === tabContent.id ? 'active': ''}
//                 >
//                     <a id={`tab-${tabContent.id}`} href={`#${tabContent.name.toLowerCase()}`}>
//                         {tabContent.name}
//                     </a>
//                 </li>
//             }
        
        
        
//         </ul>
//     )

    

// })