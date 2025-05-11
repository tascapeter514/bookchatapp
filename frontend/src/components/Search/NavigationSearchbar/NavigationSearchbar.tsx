import './NavigationSearchbar.css'
import useSearch from '../../../hooks/useSearch'
import SearchInput from '../SearchInput/SearchInput'
import {  SearchResultsData } from '../../../types'



interface Props<T extends SearchResultsData> {
    url: string,
    children: (data: T[]) => React.ReactNode
}




const NavigationSearchbar = <T extends SearchResultsData>({url, children}: Props<T>) => {


    const { searchValue, setSearchValue, searchResults } = useSearch(url)

    
    return(
            <div className='nav-searchbar-wrapper'>
                
                
                <div className={`navigation-searchbar ${searchValue && searchResults.length > 0 ? 'active' : ''}`}>
                    <SearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
                        {
                            searchValue && searchResults.length > 0 && (
                                <>{children(searchResults)}</>
                            )
                        }
                </div>
            </div>

            
    )
}

export default NavigationSearchbar

