import './SearchFilter.css'
import { FC, Dispatch, SetStateAction } from 'react'
import { SearchIcon } from '../../../common/Icons'

interface BookclubSearchbarProps {

    setSearchValue: Dispatch<SetStateAction<string>>,
    searchValue: string

}


const SearchFilter: FC<BookclubSearchbarProps>  = ({ setSearchValue, searchValue }) => {
    
    return(
        <div className="bookclub-input-wrapper">
                <input
                    name='bookclubName'
                    placeholder='Enter a Bookclub Name' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                    required />
                <SearchIcon className='search-icon'/>

        </div>

    )


}

export default SearchFilter

