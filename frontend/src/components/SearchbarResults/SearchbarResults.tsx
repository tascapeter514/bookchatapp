import './SearchbarResults.css'
import {  Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { SearchResultsArray, Book, Author, Bookclub } from '../../types'


interface SearchResultProps {
    sortedSearchResults: SearchResultsArray,
    setShowSearchResults: Dispatch<SetStateAction<boolean>>
}


const SearchResults = ({sortedSearchResults, setShowSearchResults}: SearchResultProps) => {

    console.log('sorted search results:', sortedSearchResults)

    const searchResultElements = sortedSearchResults.map((searchResultElement: {type: string, items?: Book[] | Author[] | Bookclub[]}) => {

        const searchResult = searchResultElement.items

        console.log('search result:', searchResult)

        if (!searchResult) {
            return null
        }
        
        return (
            
                <ul className='search-elements-list'>
                    {searchResult.map((result) => {
                        return (<li key={result.id} onClick={() => setShowSearchResults(false)}>
                                    <Link to={`/${result.name}/${result.id}`}>{result.name}</Link>
                                </li>)
                    })}
                </ul>



        )})

    
    return (
        <ul className="results-list">
            {searchResultElements}
        </ul>

    )
}

export default SearchResults
