import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { Bookshelf } from '../../../types'
import { checkSearchResult } from '../../../slices/searchSlice'
import './FilterResults.css'



interface FilterProps {
    children: Bookshelf[]
}


const FilterResults = ({children}: FilterProps  ) => {

    const dispatch = useDispatch()
    const search = useSelector((state: RootState) => state.search)

    console.log('filter results search state:', search)
    
    const results = children?.filter(child => child.name.toLowerCase().includes(search.searchTerm.toLowerCase()))

    return (
        <ul className="search-results-list">
            {results?.map((result: Bookshelf) => {
                return(
                    <li key={result.id} >
                        <div className='search-result'>
                            <label htmlFor={result.name}>{result.name}</label>
                            <input 
                                type="radio" 
                                className='search-result-input' 
                                name='searchResultsGroup'
                                onChange={() => dispatch(checkSearchResult({newItemId: result.id}))}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>

    )
}

export default FilterResults