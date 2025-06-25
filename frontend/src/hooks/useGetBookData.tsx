import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../slices/bookApiSlice";

export default function useGetBookData() {
    const { id } = useParams()
    const {
        data: book,
        isLoading,
        isError,
        error
    } = useGetBookQuery(Number(id), {skip: !id})

    
    return {
        book,
        isLoading,
        isError,
        error
    }

}