import { useParams } from "react-router-dom";
import { useGetBookclubDataQuery } from "../slices/bookclubApiSlice";

export default function useBookclubData() {
    const { id } = useParams()
    const { 
        data,
        isLoading,
        isError,
        error,
    } = useGetBookclubDataQuery(Number(id))


    return {
        bookclub: data?.bookclub,
        bookshelves: data?.bookshelves,
        books: data?.bookshelves.flatMap(bookshelf => bookshelf.books) ?? [],
        isLoading,
        isError,
        error
    }
}