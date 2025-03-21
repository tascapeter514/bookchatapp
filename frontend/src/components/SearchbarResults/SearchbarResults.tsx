import './SearchbarResults.css'
import { Link } from 'react-router-dom'
import { SearchData, SearchResult } from '../../types'


interface ResultProps {
    children: SearchData
}



const SearchResults = ({children}: ResultProps ) => {

    const noResults = children.map((searchResult: SearchResult) => searchResult.items).every(items => items.length < 1)
    const sortedResults = children.sort((a, b) => {
        
        return (a.items?.length || 0) - (b.items?.length || 0)
      })

    
    const resultElements = sortedResults.map((resultElement: SearchResult) => {

        console.log('search result element:', resultElement)

        const searchResult = resultElement.items

        if (!searchResult) {
            return null
        }
        
        return (
            searchResult.map((result) => {
                console.log('result link:', `/${resultElement.type}/${result.id}`)
                return (<li key={result.id} >
                            <Link to={`/${resultElement.type}/${result.id}`}>{result.name}</Link>
                        </li>)
            })
            
        )})

    
    return (
        <ul className="results-list">
            <hr className='results-divider'/>
            {noResults ? <p>No results</p> : resultElements}
        </ul>

    )
}

export default SearchResults
