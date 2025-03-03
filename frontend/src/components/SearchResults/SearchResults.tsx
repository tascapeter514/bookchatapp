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
                                
                        } else if ('author_id' in result) {
                            console.log('search result:', result)
                            return <Link to={`/author/${result.author_id}`}><li key={resultIndex}>{result.name}</li></Link>

                        } else if ('bookclub_id' in result) {

                            return <Link to={`/bookclub/${result.bookclub_id}`}><li key={resultIndex}>{result.name}</li></Link>

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