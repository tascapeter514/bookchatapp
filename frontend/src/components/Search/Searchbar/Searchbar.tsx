import './Searchbar.css'
// import SearchResults from '../SearchResults/SearchResults'
import useSearch from '../../../hooks/useSearch'
import SearchInput from '../SearchInput/SearchInput'
import { SearchResultData, SearchResultsData } from '../../../types'
import { ReactNode } from 'react'


interface Props<T extends SearchResultData | SearchResultsData> {
    url: string,
    children: (searchResults: T[]) => ReactNode
}


const Searchbar = <T extends SearchResultData | SearchResultsData>({url, children}: Props<T>) => {


    const { searchValue, setSearchValue, searchResults } = useSearch(url)

    
    return(

            <div className={`searchbar ${searchValue && searchResults.length > 0 ? 'active' : ''}`}>
                <SearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
                {searchValue && searchResults.length > 0 &&
                    (<div className='search-results'>{children(searchResults)}</div>)
                }
            </div>
    )
}

export default Searchbar



{/* <SearchResults searchData={searchResults as SearchResultsData[]}>
                        {searchData => (
                            <>
                                <Links searchResults={searchData as SearchResultsData[]} />
                            </>  
                        )}
                    </SearchResults> */}
