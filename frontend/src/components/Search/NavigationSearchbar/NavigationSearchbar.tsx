import './NavigationSearchbar.css'
import SearchResults from '../SearchResults/SearchResults'
import useSearch from '../../../hooks/useSearch'
import SearchInput from '../SearchInput/SearchInput'
import {  SearchResultsData } from '../../../types'
import Links from '../../Mappers/Links/Links'


interface Props {
    url: string
}


const Searchbar = ({url}: Props) => {


    const { searchValue, setSearchValue, searchResults } = useSearch(url)

    
    return(

            <div className={`navigation-searchbar ${searchValue && searchResults.length > 0 ? 'active' : ''}`}>
                <SearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
                {
                    searchValue && searchResults.length > 0 &&
                    <SearchResults searchData={searchResults as SearchResultsData[]}>
                        {searchData => (
                            <>
                                <Links searchResults={searchData as SearchResultsData[]} />
                            </>  
                        )}
                    </SearchResults>
                }
                
                
            </div>
    )
}

export default Searchbar

