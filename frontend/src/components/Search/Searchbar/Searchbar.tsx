import './Searchbar.css'
import SearchResults from '../SearchResults/SearchResults'
import useSearch from '../../../hooks/useSearch'
import Links from '../../Mappers/Links/Links'
import {SearchIcon} from '../../Icons'



// const wsSearchBase = import.meta.env.VITE_WS_SEARCH_BASE || 'ws://localhost:8000/ws/search/'




const Searchbar = () => {

    console.log("WebSocket Base URL: ", import.meta.env.VITE_WS_SEARCH_BASE);


    const { searchValue, setSearchValue, searchResults } = useSearch('wss://bookchatapp-2r38.onrender.com/ws/search/')

    const handleSearch = (e: string) => {
        console.log('search bar check')
        setSearchValue(e)
    }
    
    return(

            <div className={`input-wrapper ${searchValue && searchResults.length > 0 ? 'active' : ''}`}>
                <input
                    
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <SearchIcon className='search-icon'/>
                {searchValue && searchResults.length > 0 && 

                    <SearchResults searchData={searchResults}>
                        {searchData => (
                            <>
                                <Links searchResults={searchData} />
                            </>  
                        )}
                    </SearchResults>
                
                }

        
                {/* {searchValue && searchResults.length > 0 && <SearchResults searchData={searchResults} />} */}

                
                
            </div>
    )
}

export default Searchbar




