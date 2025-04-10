import './BookclubTabs.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { TabState, TabAction } from '../../reducers/tabsReducer'
import { Bookshelf } from '../../types'
import dropdownReducer from '../../reducers/dropdownReducer'
import { RightDropDownIcon } from '../Icons'



// type TabContent = {name: string, id: number}

interface TabsProps {
    bookclubTabs: TabState,
    dispatchTabs: Dispatch<TabAction>,
    bookshelves: Bookshelf[]
}


const BookclubTabs = ({ bookclubTabs, dispatchTabs, bookshelves }: TabsProps) => {

    
    return(

        <div className="tabs-container">
            {bookclubTabs.activeTab === 'Bookshelves' && }
                
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