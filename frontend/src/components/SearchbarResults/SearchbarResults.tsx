import './SearchbarResults.css'
import { Link } from 'react-router-dom'
import { SearchData, Book, Author, Bookclub } from '../../types'


interface ResultProps {
    children: SearchData
}


const SearchResults = ({children}: ResultProps ) => {
    console.log('children:', children);
    
    if (!children) {
        return <p>No results</p>
    }

    const sortedSearchResults = children.sort((a, b) => {
        console.log('sorted search:', a, b);
        
        return (a.items?.length || 0) - (b.items?.length || 0)
      })
    
    
    const searchResultElements = sortedSearchResults.map((searchResultElement: {type: string, items?: Book[] | Author[] | Bookclub[]}) => {

        const searchResult = searchResultElement.items

        

        if (!searchResult) {
            return null
        }
        
        return (
            searchResult.map((result) => {
                console.log('result:', result.name, result.id)
                return (<li key={result.id} >
                            <Link to={`/${result.name}/${result.id}`}>{result.name}</Link>
                        </li>)
            })
            
        )})

    
    return (
        <ul className="results-list">
            <hr className='results-divider'/>
            {searchResultElements}
        </ul>

    )
}

export default SearchResults


// onClick={() => setShowSearchResults(false)}