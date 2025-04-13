import BookshelfDropdown from '../BookshelfDropdown/BookshelfDropdown'
import dropdownReducer from '../../reducers/dropdownReducer'
import { TabState, TabAction } from '../../reducers/tabsReducer'
import { useReducer, Dispatch } from 'react'
import { Bookshelf } from '../../types'
import { RightDropDownIcon } from '../Icons'
import './BookshelfTabs.css'

interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>,
    bookshelves: Bookshelf[]
}


const BookshelfButtons = ({userTabs, bookshelves, dispatchUserTabs} : Props) => {

    if (bookshelves.length < 1) return

    return(
        <ul className='navbar-bookshelf-list'>
            {bookshelves.map((bookshelf, index) => (
                <li 
                    key={bookshelf.id}
                    onClick={() => dispatchUserTabs({type: 'SET_BOOKSHELF_TAB', payload: `bookshelfTab${index}`})}
                    className={userTabs.activeBookshelf === `bookshelfTab${index}`  ? 'active' : ''}
                >   
                    <a id={`bookshelf-${index + 4}`} href={`#${bookshelf.name?.toLowerCase()}`}>
                        {bookshelf.name == undefined ? '' : bookshelf.name}
                    </a>
                </li>
            ))}
        </ul>

    )

}

const BookshelfTabs = ({userTabs, bookshelves, dispatchUserTabs} : Props) => {

    const [dropdown, dispatchDropdown] = useReducer(dropdownReducer, {activePanel: false, isRotated: false})



    return(
        <>
            <BookshelfDropdown dropdown={dropdown}>
            <a 
                className={`bookshelf-button ${userTabs.activeTab === 'bookshelfPanel' && userTabs.activeBookshelf === '' ? 'active' : ''}`}
                onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookshelfPanel'})}
            >
                Bookshelves
                <RightDropDownIcon onClick={() => dispatchDropdown({type: 'TOGGLE_DROPDOWN'})} dropdown={dropdown} />
            </a>
            <BookshelfButtons userTabs={userTabs} bookshelves={bookshelves} dispatchUserTabs={dispatchUserTabs} />
            </BookshelfDropdown>
        </>
    )

}

export default BookshelfTabs