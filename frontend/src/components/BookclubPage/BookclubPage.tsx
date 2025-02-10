import './BookclubPage.css'
import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import {CurrentUser, Bookclub} from '../../types'


interface bookclubPageProps {
    user: CurrentUser | null
}



const BookclubPage : React.FC<bookclubPageProps> = () => {
    const parameters = useParams()

    const [bookclub, setBookclub] = useState<Bookclub | null>(null)

    useEffect(() => {
        fetch(`http://localhost:8000/bookclub/${params.id}`)
        .then(res => res.json())
        .then(data => setBookclub(data))
        .catch(err => console.log('There was an error fetching the following bookclub page', err))
    }, [parameters.id])

    return(

        <div className='bookclub-container'>
            <h2>Welcome to the {bookclub?.name}</h2>
        </div>
    )
}


export default BookclubPage