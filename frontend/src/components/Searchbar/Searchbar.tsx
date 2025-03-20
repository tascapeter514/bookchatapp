import './Searchbar.css'
import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import SearchbarResults from '../SearchbarResults/SearchbarResults'
import { Author, Book, Bookclub } from '../../types'
// import { useDebounce } from '../common/hooks/useSearch'
import useSearch from '../common/hooks/useSearch'
import {SearchIcon} from '../common/Icons'







// interface SearchbarProps {
//     // setSearchResults: Dispatch<SetStateAction<SearchResults>>
//     setAuthorSearchResults: Dispatch<SetStateAction<Author[]>>,
//     setBookSearchResults: Dispatch<SetStateAction<Book[]>>,
//     setBookclubSearchResults: Dispatch<SetStateAction<Bookclub[]>>
//     setShowSearchResults: Dispatch<SetStateAction<boolean>>,
//     showSearchResults: boolean



// }


const Searchbar = () => {


    const { searchValue, setSearchValue, fetchData, searchResults, error, loading } = useSearch()
    

    console.log('searchbar results:', searchResults);
    


    
    return(

            <div className={`input-wrapper ${searchResults ? 'active' : ''}`}>
                <input
                    
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchIcon className='search-icon'/>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {searchResults.length > 0 && <SearchbarResults>{searchResults}</SearchbarResults>}
                
            </div>
            
            



    )
}

export default Searchbar




