import { useGetAuthorMutation } from '../../slices/authorApiSlice'
import AuthorHeader from '../AuthorHeader/AuthorHeader'
import { useDispatch, useSelector } from 'react-redux'
import { loadAuthor } from '../../slices/authorSlice'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import AuthorBooks from '../AuthorBooks/AuthorBooks'
import { RootState } from '../../store/store'
import {useParams } from 'react-router-dom'
import {  useEffect } from 'react'
import './AuthorPage.css'


const AuthorPage = () => {

    const {id} = useParams();
    const dispatch = useDispatch()
    const [getAuthor, {isLoading, isError, error}] = useGetAuthorMutation()
    const { author } = useSelector((state: RootState) => state.author)

    const handleGetAuthor = async () => {

        try {
            const response = await getAuthor(Number(id))
            console.log('author page response:', response)
            dispatch(loadAuthor({
                ...response.data,
                authorPhoto: response.data.author_photo,
                birthDate: response.data.birth_date,
                deathDate: response.data.death_date

            }))

        } catch(err: any) {
            console.error('Error fetching author data')
        }

    }

    useEffect (() => {

        handleGetAuthor()

    }, [id])



    console.log('author page author:', author)
    return(

        <div className="author-page">
            {isLoading && <LoadSpinner />}
            <AuthorHeader author={author}/>
            <AuthorBooks author={author} />
        </div>

    )

}

export default AuthorPage