
import AuthorHeader from '../AuthorHeader/AuthorHeader'
import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import AuthorBooks from '../AuthorBooks/AuthorBooks'
import {useParams } from 'react-router-dom'
import useGetAuthor from '../../hooks/useGetAuthor'
import './AuthorPage.css'


const AuthorPage = () => {

    const {id} = useParams();


    const {author, isLoading, error} = useGetAuthor(Number(id))

 

    return(

        <div className="author-page">
            {error && <ErrorMessage>{error as string}</ErrorMessage>}
            {isLoading && <LoadSpinner />}
            {author.name && (
                <>
                    <AuthorHeader author={author}/>
                    <AuthorBooks author={author} />
                </>
            )}
        </div>

    )

}

export default AuthorPage