import { SearchState, SearchAction } from '../../../reducers/searchReducer'
import { Bookshelf, Bookclub } from '../../../types'
import { Dispatch } from 'react'
import './FilterResults.css'



interface FilterProps {
    children: Bookshelf[]
    search: SearchState,
    dispatchSearch: Dispatch<SearchAction>
}


const FilterResults = ({children, search, dispatchSearch}: FilterProps  ) => {


    
    const results = children?.filter(child => child.name.toLowerCase().includes(search.value.toLowerCase()))

    return (
        <ul className="search-results-list">
            {results?.map((result: Bookshelf | Bookclub) => {
                return(
                    <li key={result.id} >
                        <div className='search-result'>
                            <label htmlFor={result.name}>{result.name}</label>
                            <input 
                                type="radio" 
                                className='search-result-input' 
                                name='searchResultsGroup'
                                onChange={() => dispatchSearch({type: 'CHECK_RESULT', payload: result.id})}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>

    )
}

export default FilterResults