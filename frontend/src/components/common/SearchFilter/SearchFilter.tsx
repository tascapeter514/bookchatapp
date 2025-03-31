import './SearchFilter.css'
import { Dispatch } from 'react'
import { SearchState, SearchAction } from '../../../reducers/searchReducer'
import { SearchIcon } from '../Icons'


type Props = {
    search: SearchState,
    searchDispatch: Dispatch<SearchAction>
}

const SearchFilter = ({search, searchDispatch}: Props) => {

    

    return (
        <div className="searchFilter-content">
                <input
                    className='searchFilter-input'
                    name='searchValue'
                    placeholder='Enter your search term' 
                    value={search.value} 
                    onChange={(e) => searchDispatch({type: 'START_SEARCH', payload: e.target.value})}
                    required 
                />
                <SearchIcon className='search-icon'/>
                


        </div>



    )
}

export default SearchFilter
