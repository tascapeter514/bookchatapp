import { Bookclub } from '../../types'
import BookclubBackground from '../../assets/bookclub-background.jpg'
import BookclubAvatar from '../Images/BookclubAvatar/BookclubAvatar'

import './BookclubHero.css'


interface Props {
    bookclub: Bookclub
}

const BookclubHeader = ({bookclub}: Props) => {


    return (
        <div className='bookclub-top-facade'>
            <div className="bookclub-background">
                <div className="bookclub-background-img-wrapper"><img src={BookclubBackground} alt="bookclub-background" /></div>
                <BookclubAvatar id={bookclub?.id}/>
                <div className="bookclub-header-title">
                    <h1>{bookclub?.name}</h1>
                </div>
            </div>
            
                    
        </div>

    )
}


export default BookclubHeader