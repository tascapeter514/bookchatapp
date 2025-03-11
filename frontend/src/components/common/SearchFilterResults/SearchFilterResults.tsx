import './SearchFilterResults.css'
import { Variant, DynamicName } from '../../../types'


interface SearchFilterResultsProps<T, V extends Variant> {
    variant: V,
    children: T[],
    selectedElement: T,
    searchValue: string,
    handleSelection: (id: K) => void,
    name: DynamicName<T, V>,
    id: Extract<keyof T, string | number>

}


const SearchFilterResults = <T, N extends Extract<keyof T, string>>({ children, ...props}: SearchFilterResultsProps<T,  N>) => {

    const searchResults = children.filter(child => child[props.name].includes(props.searchValue.toLowerCase())).map((childElement: T) => {

        if (!childElement) {
            return null
        }
    } )

    return (
        <li 
            className='search-result-listElement'
            key={props.id}
        >
        <div className="search-result-content">
            <label htmlFor=""></label>
        
        </div>

        </li>

        

    )

}

export default SearchFilterResults