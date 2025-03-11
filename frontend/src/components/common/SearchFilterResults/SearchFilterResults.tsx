import './SearchFilterResults.css'
import {CheckmarkIcon} from '../Icons'




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
        
        if (variant === 'user' || variant === 'bookshelf') {

            const label = variant === 'user' ? childElement.username : childElement.name


            return (
                <li 
                className='search-result-listElement'
                key={childElement.id}
                >
                    <label htmlFor={label}>{label}</label>
                    <input 
                        type="radio"
                        name='searchResultsGroup'
                        checked={selectedElement === childElement.id}
                        onChange={() => handleSelection(childElement.id)}
                        className='search-result-input'

                        
                    />
                    
                </li>
            )
        }
                
    })

    return (
        <ul className='search-results-list'>
            {searchResults}
        </ul>
    )

}

export default SearchFilterResults