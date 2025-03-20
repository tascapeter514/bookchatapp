import './Searchbar.css'
import SearchbarResults from '../SearchbarResults/SearchbarResults'
import useSearch from '../common/hooks/useSearch'
import { SearchData, SearchResult } from '../../types'
import {SearchIcon} from '../common/Icons'



const Searchbar = () => {


    const { searchValue, setSearchValue, searchResults, error, loading } = useSearch()
    

    // console.log('searchbar results:', searchResults);
    // console.log('search value:', searchValue);

    
    
    


    
    return(

            <div className={`input-wrapper ${searchValue && searchResults.length > 0 ? 'active' : ''}`}>
                <input
                    
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchIcon className='search-icon'/>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {searchValue && searchResults.length > 0 && <SearchbarResults>{searchResults}</SearchbarResults>}
                
                
            </div>
            
            



    )
}

export default Searchbar




