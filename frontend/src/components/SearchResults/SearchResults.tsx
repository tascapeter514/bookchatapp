import './SearchResults.css'
import { FC, Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { SearchResultsArray, Book, Author, Bookclub } from '../../types'


interface SearchResultProps {
    sortedSearchResults: SearchResultsArray,
    setShowSearchResults: Dispatch<SetStateAction<boolean>>
}


const SearchResults: FC<SearchResultProps> = ({sortedSearchResults, setShowSearchResults}) => {

    const searchResultElements = sortedSearchResults.map((searchResultElement: {type: string, items?: Book[] | Author[] | Bookclub[]}, index) => {

        const searchResult = searchResultElement.items

        if (!searchResult) {
            return null
        }
        
        return (
            <li key={index} onClick={() => setShowSearchResults(false)}>
                <ul className='search-elements-list'>
                    {searchResult.map((result, resultIndex) => {
                        if ('title' in result) {
                            return <li key={result.title_id}>
                                <Link to={`/book/${result.title_id}`}>{result.title}</Link>
                                </li>
                            
                            
                                
                        } else if ('author_id' in result) {
                            console.log('search result:', result)
                            return <li key={result.author_id}>
                                        <Link to={`/author/${result.author_id}`}>{result.name}</Link>
                                  </li>
                            
                            

                        } else if ('bookclub_id' in result) {

                            return <li key={resultIndex}>
                                <Link to={`/bookclub/${result.bookclub_id}`}>{result.name}</Link></li>
                            

                        }

                        return null

                    })}
                </ul>

            </li>

        )})

    
    return (
        <ul className="results-list">
            {searchResultElements}
        </ul>

    )
}

export default SearchResults