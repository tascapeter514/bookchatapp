import { useState, useEffect } from 'react'
// import { BookData } from '../slices/searchApiSlice'
import { SearchResultData } from '../types'
import { useLazyGetBookDataQuery } from '../slices/searchApiSlice'


const useBookSearch = () => {


    const [searchValue, setSearchValue] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')
    const [searchResults, setSearchResults] = useState<SearchResultData[]>([])

    const [triggerBookSearch, {data, isError, error, reset}] = useLazyGetBookDataQuery()



    // set debounce when search value changes
    useEffect(() => {
        const id = setTimeout(() => {
            console.log('setting new timeout')
            setDebouncedValue(searchValue)
        }, 500)
    
        return () => {
            console.log('clearing timeout')
            clearTimeout(id)
            }
        }, [searchValue])
    
    //fetch search data when debounced value changes
    useEffect(() => {
        if (!debouncedValue) return
        triggerBookSearch(debouncedValue)
    
        
    }, [debouncedValue, triggerBookSearch])

    useEffect(() => {
        if (data && data?.search_results?.length > 0 && data.type === 'get_books_data') {
            console.log('use book search data:', data)
            setSearchResults(data.search_results)
        }
    }, [data])

    // set search value to empty string when location pathname changes
    useEffect(() => {
        setSearchValue('')

    }, [location.pathname])

    // set search results to empty array if no search value
    useEffect(() => {
        if (!searchValue) {
            setSearchResults([])
        }
    }, [searchValue])



    return { searchValue, searchResults, setSearchValue, setSearchResults, isError, error, reset }

}

export default useBookSearch