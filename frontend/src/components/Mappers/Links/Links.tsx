import './Links.css'
import { SearchLink, SearchLinkData, SearchResultsData} from '../../../types'
import { SearchIcon } from '../../Icons'
import { Link } from 'react-router-dom'

interface Props {
    searchResults: SearchResultsData[]
}



const Links = ({searchResults} : Props) => {

    if (!searchResults) return (<p>No Results</p>);

    const sortedResults = searchResults.sort((a, b) => {
        return (a.items.length || 0) - (b.items.length || 0)
    })

    return(

        <ul className='sorted-links-list'>
            <hr className='links-divider'/>
            {sortedResults.map((result: SearchLinkData) => {

                if (!result) return null;

                return(
                    result.items.map((r: SearchLink) => {
                        return(
                            <li key={r.id} className='search-link-list-element'>
                                <SearchIcon className='link-search-icon'/>
                                <Link to={`/${result.type}/${r.id}`} className='search-link'>
                                    {r.name}
                                </Link>

                            </li>
                        )
                    })
                )

                
            })}

        </ul>


    )

}

export default Links