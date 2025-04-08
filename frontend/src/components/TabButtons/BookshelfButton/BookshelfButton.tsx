
import { ReactNode } from 'react'
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




 