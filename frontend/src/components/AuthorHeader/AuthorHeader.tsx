import Accordion from '../Accordion/Accordion'
import { Author } from '../../types'
import './AuthorHeader.css'


interface Props {
    author: Author
}


const AuthorHeader = ({author}: Props) => {

    return(
        <div className="author-header">
            <img src={author.authorPhoto} alt="" className="author-cover" fetchPriority='high' width='500' height='500' />
            <article className="author-info">
                <h1>{author.name}</h1>
                <p>Born on <span>{author.birthDate}</span></p>
                <p>Died on <span>{author.deathDate}</span></p>
                <hr />
                <h3>ABOUT THE AUTHOR </h3>
                                
                <Accordion>{author.bio}</Accordion>
                <hr />
            </article>
        </div>
    )

}

export default AuthorHeader