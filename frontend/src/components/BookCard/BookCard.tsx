import { LikeIcon, DislikeIcon, CancelIcon } from '../common/Icons'
import { useEffect } from 'react'
import { Data } from '../../reducers/dataReducer'
import { userContext } from '../common/Context/UserContext/UserContext'
import useDelete from '../common/hooks/useDelete'
import { Book, Author } from '../../types'
import './BookCard.css'

interface Props {
    children: Book | Data,
    bookshelfId: number
}


const BookCard = ({children, bookshelfId}: Props) => {

    const { bookshelfDispatch } = userContext()
    const {data, makeRequest} = useDelete(`http://localhost:8000/api/user/book/delete/${children.id}`)


    useEffect(() => {
        if (!data.isLoading && !data.isError && data.data) {
            console.log('delete data:', data.data)
            bookshelfDispatch({type: 'REMOVE_BOOK', payload: {bookshelfId: bookshelfId, oldBook: data.data}})
        }

    }, [data, bookshelfDispatch])

    const deleteBook = async () => {
        const data = {bookshelfId: bookshelfId}
        try {

            await makeRequest(data);

        } catch (err: any) {
            bookshelfDispatch({type: 'BOOKSHELF_ERROR', payload: err.response?.data?.error || 'An unexpected error occurred'})
        }

    }

    return(
        <article className="book-card" >
            <div className="img-overlay">
                <CancelIcon onClick={deleteBook}></CancelIcon>
                <img src={children.imageLinks?.thumbnail} alt="book-card-cover" className='book-card-img' />
                <div className="book-card-buttons">
                    <LikeIcon></LikeIcon>
                    <DislikeIcon></DislikeIcon>
                </div>
            </div>      
            <div className="book-card-back">
                <h3 className="book-card-title">{children.name}</h3>
                {children.authors?.map((author: Author) => (
                    <li className='card-author-listElement' key={author.id}><span className='card-author-name'>{author.name}</span></li>
                ))}
                <p className="book-card-ratings">{children.averageRating} out of {children.ratingsCount} ratings</p>
                        
            </div>
        </article>
    )

}

export default BookCard