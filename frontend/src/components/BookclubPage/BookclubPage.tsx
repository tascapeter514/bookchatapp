import './BookclubPage.css'
import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import {CurrentUser, Bookclub} from '../../types'


interface bookclubPageProps {
    user: CurrentUser | null
}



const BookclubPage : React.FC<bookclubPageProps> = ({user}) => {
    const parameters = useParams()

    const [bookclub, setBookclub] = useState<Bookclub | null>(null)
    console.log('parameters:', parameters)

    useEffect(() => {
        fetch(`http://localhost:8000/bookclub/${parameters.id}`)
        .then(res => res.json())
        .then(data => setBookclub(data))
        .catch(err => console.log('There was an error fetching the following bookclub page', err))
    }, [parameters.id])

    console.log('bookclub page:', bookclub)

    return(

        <div className='bookclub-container'>
            <h2>Welcome to the {bookclub?.name}</h2>
        </div>
    )
}


export default BookclubPage