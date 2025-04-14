import BookclubImage from '../../../assets/areej-fateyma-w1fdd9FldPA-unsplash.jpg'
import FileUploadModal from '../../Modals/FileUploadModal/FileUploadModal'
import './BookclubAvatar.css'


interface Props {
    id: number
}


const BookclubAvatar = ({id}: Props) => {

    return(
        <div className="avatar-wrapper">
            <img src={BookclubImage} className="bookclub-avatar" />
            <FileUploadModal id={id ?? ''} />
        </div>
    )

}

export default BookclubAvatar