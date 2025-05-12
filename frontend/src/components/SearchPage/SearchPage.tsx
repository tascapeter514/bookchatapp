import './SearchPage.css'
import NavigationSearchbar from '../Search/NavigationSearchbar/NavigationSearchbar'
import Links from '../Mappers/Links/Links'
import { WEBSOCKET_BASE } from '../../utils/baseAPI'
import { SearchResultsData } from '../../types'



const SearchPage = () => {

    return(
        <main className='search-page'>
            <h1>Search for books, authors, and bookclubs</h1>

                <NavigationSearchbar url={`${WEBSOCKET_BASE}/ws/search/`}>
                  {searchResults => (
                    <>
                      <Links searchResults={searchResults as SearchResultsData[]} />
                    </>  
                  )} 
                </NavigationSearchbar>
              
            

        </main>
    )

}

export default SearchPage