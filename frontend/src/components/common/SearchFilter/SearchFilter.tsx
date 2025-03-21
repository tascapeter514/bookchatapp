import './SearchFilter.css'
import { useState } from 'react'
import FilterResults from '../../Bookpage/components/SearchFilter/FilterResults'
import { Bookshelf } from '../../../types'
import { SearchIcon } from '../Icons'


type Props = {
    children: Bookshelf[]
}

const SearchFilter = ({children}: Props) => {

    const [searchValue, setSearchValue] = useState('')

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
                <FilterResults searchValue={searchValue}>{children}</FilterResults>


        </div>



    )
}

export default SearchFilter
