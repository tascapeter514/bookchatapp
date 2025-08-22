import { useGetAuthorMutation } from "../slices/authorApiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadAuthor } from "../slices/authorSlice";
import type { RootState } from "../store/store";

const useGetAuthor = (id: number) => {

    const dispatch = useDispatch();
    const [ getAuthor, {isLoading} ] = useGetAuthorMutation();
    const { author } = useSelector((state: RootState ) => state.author);
    const [error, setError ] = useState<string>('')

    useEffect(() => {

        const fetchAuthor = async () => {
            

            try {

                const response = await getAuthor(id);
                dispatch(loadAuthor({
                    ...response.data,
                    authorPhoto: response.data.author_photo,
                    birthDate: response.data.birth_date,
                    deathDate: response.data.death_date

                }))

            } catch (err:any) {
                console.error('Get author data error:', err)
                setError(err.message || 'Error fetching author data')

            }

        }

        if (id) fetchAuthor()

        
        

    }, [id, getAuthor, dispatch])

    return {author, isLoading, error}


}

export default useGetAuthor