import './BookshelfButtons.css'
import { TabState, TabAction } from '../../reducers/tabsReducer'
import { Dispatch, useReducer } from 'react'
import { Bookshelf } from '../../types'
import { RightDropDownIcon } from '../Icons'
import dropdownReducer from '../../reducers/dropdownReducer'


interface Props {
    bookshelves: Bookshelf[],
    bookclubTabs: TabState,
    dispatchTabs: Dispatch<TabAction>,

}

const BookshelfButtons = ({bookshelves, bookclubTabs, dispatchTabs}: Props) => {

    

    if (bookshelves.length < 1) return

    return(
        bookshelves.map((bookshelf: Bookshelf, index: number) => {
            return(
                <ul className='tabs-list'>
                    <li 
                        key={bookshelf.id}
                        onClick={() => dispatchTabs({type: 'SET_ACTIVE_TAB', payload: `bookshelfButton${index}`})}
                        className={bookclubTabs.activeTab === `bookshelfClub${index}`  ? 'active' : ''}
                    >
                        <a 
                            id={`tab-${bookshelf.id}`} 
                            href={`#${bookshelf.name.toLowerCase()}`}
                        >
                            {bookshelf.name}
                        <RightDropDownIcon 
                            aria-controls='bookshelves-subnav'
                            aria-expanded={bookclubTabs.showNav}
                            onClick={() => dispatchDropdown}
                            dropdown={dropdown}
                        >

                        </RightDropDownIcon>

                    </a>
                    
                </li>
                </ul>

            )
        })
        

    )

}

export default BookshelfButtons