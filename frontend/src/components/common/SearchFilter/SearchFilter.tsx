import './SearchFilter.css'
import { Dispatch } from 'react'
import { SearchState, SearchAction } from '../../../reducers/searchReducer'
import { SearchIcon } from '../Icons'


type Props = {
    search: SearchState,
    dispatchSearch: Dispatch<SearchAction>
}

const SearchFilter = ({search, dispatchSearch}: Props) => {

    

    return (
        <div className="searchFilter-content">
                <input
                    className='searchFilter-input'
                    name='searchValue'
                    placeholder='Enter your search term' 
                    value={search.value} 
                    onChange={(e) => dispatchSearch({type: 'START_SEARCH', payload: e.target.value})}
                    required 
                />
                <SearchIcon className='search-icon'/>
                


        </div>



    )
}

export default SearchFilter
