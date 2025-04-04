import './BookHeader.css'
import { ReactNode } from 'react'


interface Props {
    children: ReactNode

}

const BookHeader = ({children}: Props) => {
    return(

        <div className="book-header">
            {children}
        </div>
    )
}

export default BookHeader


 