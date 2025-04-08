
import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import BookshelfTabs from '../../BookshelfTabs/BookshelfTabs'
import { Dispatch } from 'react'


import CreateBookshelfModal from '../../Modals/CreateBookshelfModal/CreateBookshelfModal'
import './BookshelfButton.css'

interface Props {

    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
    
}

const BookshelfButton = ({userTabs, dispatchUserTabs}: Props) => {
     


                
    return (
        <div className='tab-button bookshelves'>
            <hr className='navbar-line-break' />
            <BookshelfTabs userTabs={userTabs} dispatchUserTabs={dispatchUserTabs} />
            <CreateBookshelfModal />
           
            
           
        </div>
    )

}

export default BookshelfButton


 