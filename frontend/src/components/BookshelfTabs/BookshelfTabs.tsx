import BookshelfDropdown from '../BookshelfDropdown/BookshelfDropdown'
import dropdownReducer from '../../reducers/dropdownReducer'
import { TabState, TabAction } from '../../reducers/tabsReducer'
import { useReducer, Dispatch } from 'react'
import { Bookshelf } from '../../types'
import { RightDropDownIcon } from '../Icons'
import './BookshelfTabs.css'

interface Props {
    tabs: TabState,
    dispatchTabs: Dispatch<TabAction>,
    bookshelves: Bookshelf[]
}


const BookshelfButtons = ({tabs, bookshelves, dispatchTabs} : Props) => {

    console.log('bookshelf buttons:', tabs)

    if (bookshelves.length < 1) return

    return(
        <ul className='navbar-bookshelf-list'>
            {bookshelves.map((bookshelf, index) => (
                <li 
                    key={bookshelf.id}
                    onClick={() => dispatchTabs({type: 'SET_BOOKSHELF_TAB', payload: `bookshelfTab${index}`})}
                    className={tabs.activeBookshelf === `bookshelfTab${index}`  ? 'active' : ''}
                >   
                    <a id={`bookshelf-${index + 4}`} href={`#${bookshelf.name?.toLowerCase()}`}>
                        {bookshelf.name == undefined ? '' : bookshelf.name}
                    </a>
                </li>
            ))}
        </ul>

    )

}

const BookshelfTabs = ({tabs, bookshelves, dispatchTabs} : Props) => {

    const [dropdown, dispatchDropdown] = useReducer(dropdownReducer, {activePanel: false, isRotated: false})



    return(
        <>
            <BookshelfDropdown dropdown={dropdown}>
                <a 
                    className={`bookshelf-button ${tabs.activeTab === 'bookshelfPanel' && tabs.activeBookshelf === '' ? 'active' : ''}`}
                    onClick={ () => dispatchTabs({type: 'SET_ACTIVE_TAB', payload: 'bookshelfPanel'})}
                >
                    Bookshelves
                    <RightDropDownIcon onClick={() => dispatchDropdown({type: 'TOGGLE_DROPDOWN'})} dropdown={dropdown} />
                </a>
                <BookshelfButtons tabs={tabs} bookshelves={bookshelves} dispatchTabs={dispatchTabs} />
            </BookshelfDropdown>
        </>
    )

}

export default BookshelfTabs