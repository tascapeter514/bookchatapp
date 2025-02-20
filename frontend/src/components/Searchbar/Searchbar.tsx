import './Searchbar.css'
import { FC, useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'


type IconProps = React.ComponentPropsWithoutRef<'svg'>


const SearchIcon: FC<IconProps> = (props) => {
    return  <FaSearch {...props}></FaSearch>
}

const useDebounce = (value: string, delay: number = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);


    useEffect(() => {
        const id = setTimeout(() => {
            console.log('setting new timeout')
            setDebouncedValue(value)
        }, delay)

        return () => {

            console.log('clearing timeout')
            clearTimeout(id)
        }
    }, [value, delay])
    return debouncedValue
}




const Searchbar: FC = () => {

    const [searchValue, setSearchValue] = useState('')

    const debouncedSearchValue = useDebounce(searchValue, 1000)

    const fetchSearchData = (value: string) => {
        try {

        } catch (err) {
            console.error('There was an error with the search connection:', err)
        }

    }

    const handleChange = (value: string) => {
        setSearchValue(value)
        fetchSearchData(value)
    }


    return(

            <div className="input-wrapper">
            
                <input  
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => handleChange(e.target.value)} />
                <SearchIcon className='search-icon'/>

            </div>



    )
}

export default Searchbar