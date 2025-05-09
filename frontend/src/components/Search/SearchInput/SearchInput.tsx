import './SearchInput.css'
import { Dispatch } from 'react'
import { SearchIcon } from '../../Icons'

interface Props {
    searchValue: string,
    setSearchValue: Dispatch<string>
}


const SearchInput = ({searchValue, setSearchValue}: Props) => {

    return(
        <>
            <input
            className='search-input'
            placeholder='Type to search...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} 
        
            />
            <SearchIcon className='search-icon'/>
        </>
        
    )

}

export default SearchInput