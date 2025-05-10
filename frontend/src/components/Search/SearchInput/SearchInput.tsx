import './SearchInput.css'
import { Dispatch } from 'react'
import { SearchIcon } from '../../Icons'

interface Props {
    searchValue: string,
    setSearchValue: Dispatch<string>
}


const SearchInput = ({searchValue, setSearchValue}: Props) => {

    return(
        <div className='search-input-container'>
            <input
            className='search-input'
            placeholder='Type to search...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} 
        
            />
            <SearchIcon className='search-input-icon'/>
        </div>
        
    )

}

export default SearchInput