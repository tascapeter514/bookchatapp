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
                <p>
                    {searchResult.map((result, resultIndex) => {
                        if ('title' in result) {
                            return <Link to={`/book/${result.title_id}`}>
                                        <li key={resultIndex}>{result.title}</li>
                                    </Link>
                                
                        } else if ('name' in result) {
                            return <Link to=""><li key={resultIndex}>{result.name}</li></Link>
                        }

                        return null

                    })}
                </p>

            </li>

        )})

    
    return (
        <ul className="results-list">
            {searchResultElements}
        </ul>

    )
}

export default SearchResults