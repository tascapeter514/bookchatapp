import './SearchFilterResults.css'
import { Variant } from '../../../types'



interface ChildElement {
    name?: string,
    username?: string,
    id: string | number
}

interface SearchFilterResultsProps<T extends ChildElement> {
    variant: string,
    children: T[],
    selectedElement: string | number,
    searchValue: string,
    handleSelection: (id: string | number) => void,

    

}


const SearchFilterResults = <T extends ChildElement,>({ children, searchValue, variant, selectedElement, handleSelection}: SearchFilterResultsProps<T>) => {

    console.log('search result variant:', variant)

    const searchResults = children.filter((child: ChildElement) => {
            return child.name ? child.name.includes(searchValue.toLowerCase()) : child.username?.includes(searchValue.toLowerCase())
        })
        .map((childElement: ChildElement) => {

        if (!childElement) {
            return null
        }
        
        return (
            variant === 'user' && (
                <li 
                className='search-result-listElement'
                key={childElement.id}
                >
                    <label htmlFor={childElement.username}>{childElement.username}</label>
                    <input 
                        type="radio"
                        className='search-result-input'
                        name='searchResultsGroup'
                        checked={selectedElement === childElement.id}
                        onChange={() => handleSelection(childElement.id)}
                    /> 
                </li>
            ))
        
    })

    return (
        <ul className='search-results-list'>
            {searchResults}
        </ul>
    )

}

export default SearchFilterResults