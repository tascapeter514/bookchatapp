
import Button from '../../Buttons/Button/Button'
import BookclubImage from '../../../assets/areej-fateyma-w1fdd9FldPA-unsplash.jpg'
import './BookclubAvatar.css'


const BookclubAvatar = () => {

    return(
        <div className="avatar-wrapper">
            <img src={BookclubImage} className="bookclub-avatar" />
            <Button>Change Image</Button>
        </div>
    )

}

export default BookclubAvatar