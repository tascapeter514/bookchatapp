import {Bookshelf} from '../../../../../types'
import './BookshelfComponent.css'
import { LikeIcon, DislikeIcon, CancelIcon } from '../../../Icons'
import { Dispatch, SetStateAction } from 'react'

interface BookshelfProps {
    bookshelf: Bookshelf,
    activeBookshelf: number,
    deleteTitle: (book_id: string) => Promise<void>,
    setDeleteBookshelf: Dispatch<SetStateAction<string>>
}


const BookshelfComponent = ({bookshelf, activeBookshelf, setDeleteBookshelf, deleteTitle}: BookshelfProps) => {

    



    const bookshelfTitles = (bookshelf?.titles ?? []).map((bookshelfTitle) => {

        const handleDeleteTitle = () => {
            console.log('handle delete title check')

            setDeleteBookshelf(bookshelf.bookshelf_id)

            deleteTitle(bookshelfTitle.title_id)

        }



       return <li className='book-card-listElement' key={bookshelfTitle.title_id}>
                <article className="book-card" >
                   
                    <div className="img-overlay">
                        <CancelIcon onClick={handleDeleteTitle}></CancelIcon>
                        <img src={bookshelfTitle.imageLinks.thumbnail} alt="book-card-cover" className='book-card-img' />
                        <div className="book-card-buttons">
                            <LikeIcon></LikeIcon>
                            <DislikeIcon></DislikeIcon>
                        </div>
                    </div>
                       
                    <div className="book-card-back">
                        <h3 className="book-card-title">{bookshelfTitle.title}</h3>
                        {bookshelfTitle.authors.map(author => (
                            <li className='card-author-listElement' key={author.author_id}><span className='card-author-name'>{author.name}</span></li>
                        ))}
                        <p className="book-card-ratings">{bookshelfTitle.averageRating} out of {bookshelfTitle.ratingsCount} ratings</p>
                        
                    </div>
                </article>
                
             </li>

    })






    return(
        <section className="bookshelf-container">
            <ul className='bookshelf-title-list'>{bookshelfTitles}</ul>
        </section>
        
    )
}

export default BookshelfComponent