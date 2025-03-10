import './SearchFilter.css'
import { Dispatch, SetStateAction } from 'react'
import { SearchIcon } from '../../../common/Icons'


interface SearchFilterProps {
    setSearchValue: Dispatch<SetStateAction<string>>,
    searchValue: string
}

const SearchFilter = ({setSearchValue, searchValue}: SearchFilterProps) => {

    return (
        <div className='inviteUser-searchbar'>
            <input

                name='userName'
                placeholder='Search for another user'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} 
                required
            />
            <SearchIcon />
        
        </ div>
    )

}

export default SearchFilter