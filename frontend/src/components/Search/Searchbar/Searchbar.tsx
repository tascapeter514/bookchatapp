import './Searchbar.css'
import SearchbarResults from '../SearchbarResults/SearchbarResults'
import useSearch from '../../../hooks/useSearch'
import {SearchIcon} from '../../Icons'



const wsSearchBase = import.meta.env.VITE_WS_SEARCH_BASE || 'ws://localhost:8000/ws/search/'



const Searchbar = () => {


    const { searchValue, setSearchValue, searchResults } = useSearch(wsSearchBase)
    
    return(

            <div className={`input-wrapper ${searchValue && searchResults.length > 0 ? 'active' : ''}`}>
                <input
                    
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchIcon className='search-icon'/>

                {searchValue && searchResults.length > 0 && <SearchbarResults>{searchResults}</SearchbarResults>}

                
                
            </div>
    )
}

export default Searchbar




