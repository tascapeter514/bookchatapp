
import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import BookshelfTabs from '../../BookshelfTabs/BookshelfTabs'
import NavbarDivider from '../../Dividers/NavbarDivider/NavbarDivider'
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
            <NavbarDivider />
            <BookshelfTabs userTabs={userTabs} dispatchUserTabs={dispatchUserTabs} />
            <CreateBookshelfModal />
           
            
           
        </div>
    )

}

export default BookshelfButton


 