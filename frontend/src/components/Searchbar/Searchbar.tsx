import './Searchbar.css'
import { FC, useState } from 'react'
import { FaSearch } from 'react-icons/fa'


type IconProps = React.ComponentPropsWithoutRef<'svg'>


const SearchIcon: FC<IconProps> = (props) => {
    return  <FaSearch {...props}></FaSearch>
}




const Searchbar: FC = () => {

    const [searchInput, setSearchInput] = useState('')

    const fetchSearchData = (value: string) => {

    }

    const handleChange = (value: string) => {
        setSearchInput(value)
        fetchSearchData(value)
    }


    return(

            <div className="input-wrapper">
                <SearchIcon className='search-icon'/>
                
                <input  
                    placeholder='Type to search...' 
                    value={searchInput} 
                    onChange={(e) => handleChange(e.target.value)} />

            </div>



    )
}

export default Searchbar