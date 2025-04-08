
import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import BookshelfTabs from '../../BookshelfTabs/BookshelfTabs'
import NavbarDivider from '../../Dividers/NavbarDivider/NavbarDivider'
import { Dispatch, ReactNode } from 'react'
import CreateBookshelfModal from '../../Modals/CreateBookshelfModal/CreateBookshelfModal'
import './BookshelfButton.css'


interface Props {

    children: ReactNode
    
}

const BookshelfButton = ({children}: Props) => {
     


                
    return (
        <div className='tab-button bookshelves'>

           {children}
            
           
        </div>
    )

}

export default BookshelfButton

{/* <NavbarDivider />
<BookshelfTabs userTabs={userTabs} dispatchUserTabs={dispatchUserTabs} />
<CreateBookshelfModal /> */}


 