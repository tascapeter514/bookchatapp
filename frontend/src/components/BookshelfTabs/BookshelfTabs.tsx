import BookshelfDropdown from '../BookshelfDropdown/BookshelfDropdown'
import dropdownReducer from '../../reducers/dropdownReducer'
import { TabState, TabAction } from '../../reducers/userTabsReducer'
import { useReducer, Dispatch, useState } from 'react'
import { Bookshelf } from '../../types'
import { RightDropDownIcon } from '../Icons'
import './BookshelfTabs.css'

interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>,
    bookshelves: Bookshelf[]
}


const BookshelfTabs = ({userTabs, bookshelves, dispatchUserTabs} : Props) => {

    const [dropdown, dispatchDropdown] = useReducer(dropdownReducer, {activePanel: false, isRotated: false})

    // const [bookshelves] = useState<Bookshelf[]>(bookshelves || [])

    // console.log('bookshelf tabs:', bookshelves)

    const bookshelfTabs = bookshelves.map((bookshelf, index) => {

        // console.log('bookshelf:', bookshelf)

        if (bookshelves.length < 1) return

        return (
            <li 
                key={bookshelf.id}
                onClick={() => dispatchUserTabs({type: 'SET_BOOKSHELF_TAB', payload: `bookshelfTab${index}`})}
                className={userTabs.activeBookshelf === `bookshelfTab${index}`  ? 'active' : ''}
            >   
                <a id={`bookshelf-${index + 4}`} href={`#${bookshelf.name?.toLowerCase()}`}>
                    {bookshelf.name == undefined ? '' : bookshelf.name}
                </a>
            </li>
        )
    })

    return(
        <>
            <BookshelfDropdown dropdown={dropdown}>
            <a 
                className={`bookshelf-button ${userTabs.activeTab === 'bookshelfTab' && userTabs.activeBookshelf === '' ? 'active' : ''}`}
                onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookshelfTab'})}
            >
                Bookshelves
                <RightDropDownIcon onClick={() => dispatchDropdown({type: 'TOGGLE_DROPDOWN'})} dropdown={dropdown} />
            </a>
            <ul className='navbar-bookshelf-list'>{bookshelfTabs}</ul>
            </BookshelfDropdown>
        </>
    )

}

export default BookshelfTabs