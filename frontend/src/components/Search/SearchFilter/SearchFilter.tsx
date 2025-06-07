import './SearchFilter.css'
import { useDispatch } from 'react-redux'
import { startSearch } from '../../../slices/searchSlice'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'
import { SearchIcon } from '../../Icons'

// {type: 'START_SEARCH', payload: e.target.value}

const SearchFilter = () => {

    const dispatch = useDispatch()
    const search = useSelector((state: RootState) => state.search)


    

    return (
        <div className="searchFilter-content">
            <input
                className='searchFilter-input'
                name='searchValue'
                placeholder='Enter your search term' 
                value={search.searchTerm} 
                onChange={(e) => dispatch(startSearch(e.target.value))}
                required 
            />
            <SearchIcon className='search-filter-search-icon'/>

        </div>
    )
}

export default SearchFilter
