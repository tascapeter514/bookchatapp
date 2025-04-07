
import BookshelfDropdown from '../../BookshelfDropdown/BookshelfDropdown'
import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import { Dispatch } from 'react'
import { useState, useRef, useReducer} from 'react'
import dropdownReducer from '../../../reducers/dropdownReducer'
import { RightDropDownIcon } from '../../Icons'
import CreateBookshelfModal from '../../Modals/CreateBookshelfModal/CreateBookshelfModal'
import './BookshelfButton.css'

interface Props {

    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
    
}

const BookshelfButton = ({userTabs, dispatchUserTabs}: Props) => {
     
    const [dropdown, dispatchDropdown] = useReducer(dropdownReducer, {activePanel: false, isRotated: false})


    // console.log('bookshelves:', bookshelves)

    // const bookshelfNames = bookshelves.data?.map((bookshelf, index) => {

    //     console.log('bookshelf:', bookshelf)

    //     return (
    //         <li 
    //             key={bookshelf.id}
    //             onClick={() => tabsDispatch({type: 'SET_BOOKSHELF_TAB', payload: `bookshelfTab${index}`})}
    //             className={userTabs.activeBookshelf === `bookshelfTab${index}`  ? 'active' : ''}
    //         >   
    //             <a id={`bookshelf-${index + 4}`} href={`#${bookshelf.name?.toLowerCase()}`}>
    //                 {bookshelf.name == undefined ? '' : bookshelf.name}
    //             </a>
    //         </li>
    //     )
    // })

                
    return (
        <div className='tab-button bookshelves'>
            <hr className='navbar-line-break' />
            <BookshelfDropdown dropdown={dropdown}>
                <a 
                    className={`bookshelf-button ${userTabs.activeTab === 'bookshelfTab' && userTabs.activeBookshelf === '' ? 'active' : ''}`}
                    onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookshelfTab'})}
                >
                    Bookshelves
                    <RightDropDownIcon onClick={() => dispatchDropdown({type: 'TOGGLE_DROPDOWN'})} dropdown={dropdown} />
                </a>
                {/* <ul className='navbar-bookshelf-list'>{bookshelfNames}</ul> */}
            </BookshelfDropdown>
            <CreateBookshelfModal />
            
           
        </div>
    )

}

export default BookshelfButton


 