import { Bookclub } from '../../types'
import BookclubBackground from '../../assets/bookclub-background.jpg'
import BookclubAvatar from '../Images/BookclubAvatar/BookclubAvatar'

import './BookclubHeader.css'


interface Props {
    bookclub: Bookclub
}

const BookclubHeader = ({bookclub}: Props) => {


    return (
        <div className='bookclub-top-facade'>
            <div className="bookclub-background">
                <div className="bookclub-background-img-wrapper"><img src={BookclubBackground} alt="" /></div>
                <BookclubAvatar id={bookclub?.id}/>
                <div className="bookclub-header-title">
                    <h2>{bookclub?.name}</h2>
                </div>
            </div>
            
                    
        </div>

    )
}


export default BookclubHeader