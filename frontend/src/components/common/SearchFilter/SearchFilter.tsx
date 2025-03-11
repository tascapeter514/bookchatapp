import './SearchFilter.css'
import {Dispatch, SetStateAction} from 'react'
import { SearchIcon } from '../Icons'


interface SearchFilterProps {
    setSearchValue: Dispatch<SetStateAction<string>>,
    searchValue: string
}

const SearchFilter = ({ searchValue, setSearchValue }: SearchFilterProps) => {
    return (
        <div className="searchFilter-content">
                <input
                    className='searchFilter-input'
                    name='searchValue'
                    placeholder='Enter your search term' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                    required 
                />
                <SearchIcon className='search-icon'/>

        </div>



    )
}

export default SearchFilter
