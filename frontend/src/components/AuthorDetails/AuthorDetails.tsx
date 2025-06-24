import './AuthorDetails.css'
import { Link } from 'react-router-dom'


interface Props {
    id: number,
    name: string,
    bio: string
}


const AuthorDetails = ({id, name, bio}: Props) => {

    return(
        <aside key={id} className='author-details'>
            <hr />
            <h2>About {name}</h2>
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