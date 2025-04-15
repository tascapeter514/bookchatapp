import './BooksPage.css'
import BookSlider from '../BookSlider/BookSlider'
import { useGetBooksQuery } from '../../slices/bookApiSlice'
import { useCallback } from 'react'


const BooksPage = () => {

    const {data, isLoading, isError, error} = useGetBooksQuery()

   
    console.log('books page data:', data)

        return(
            <div>Books Page</div>

        )

}

export default BooksPage


 // const [bestsellers, setBestsellers] = useState<Book[]>([])
    


    // useEffect(() => {
    //     fetch('http://localhost:8000/')
    //     .then(res => res.json())
    //     .then(data => setBestsellers(data))
    // }, [])

   {/* <h3>Bestsellers</h3>
        <BookSlider books={bestsellers}></BookSlider> */}