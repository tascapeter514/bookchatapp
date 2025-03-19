import './Searchbar.css'
import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { Author, Book, Bookclub } from '../../types'
// import { useDebounce } from '../common/hooks/useSearch'
import useSearch from '../common/hooks/useSearch'
import {SearchIcon} from '../common/Icons'







interface SearchbarProps {
    // setSearchResults: Dispatch<SetStateAction<SearchResults>>
    setAuthorSearchResults: Dispatch<SetStateAction<Author[]>>,
    setBookSearchResults: Dispatch<SetStateAction<Book[]>>,
    setBookclubSearchResults: Dispatch<SetStateAction<Bookclub[]>>
    setShowSearchResults: Dispatch<SetStateAction<boolean>>,
    showSearchResults: boolean



}


const Searchbar = ({setAuthorSearchResults, setBookSearchResults, setBookclubSearchResults, setShowSearchResults, showSearchResults}: SearchbarProps) => {


    const { searchValue, setSearchValue, error, loading } = useSearch()

    
    return(

            <div className="input-wrapper">
                <input
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchIcon className='search-icon'/>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
            </div>
            



    )
}

export default Searchbar




