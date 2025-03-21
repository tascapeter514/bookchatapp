import './AuthorDetails.css'
import { Link } from 'react-router-dom'
import { Author } from '../../types'


interface Props {
    id: number,
    name: string,
    bio: string
}


const AuthorDetails = ({id, name, bio}: Props) => {

    return(
        <aside key={id} className='author-details'>
            <hr />
            <h3>About {name}</h3>
            <div className='author-text-container'>
                <p>{bio}</p>
                <span className="author-link">
                    ... <Link to={`/author/${id}`}>More about { name } </Link>
                </span>
            </div>
        </aside>
    )


}

export default AuthorDetails