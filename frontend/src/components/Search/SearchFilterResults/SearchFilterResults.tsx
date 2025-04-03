import './SearchFilterResults.css'


interface ChildElement<T extends string | number> {
    name?: string,
    username?: string,
    id: T
}


interface SearchFilterResultsProps<T extends string | number> {
    variant: string,
    children: ChildElement<T>[],
    selectedElement: T,
    searchValue: string,
    handleSelection: (id: T) => void,
}




const SearchFilterResults = <T extends string | number,>(
    { children, searchValue, variant, selectedElement, handleSelection}: SearchFilterResultsProps<T>) => {

    console.log('search result variant:', variant)

    const searchResults = children.filter((child: ChildElement<T>) => {
            return child.name ? child.name.includes(searchValue.toLowerCase()) : child.username?.includes(searchValue.toLowerCase())
        })
        .map((childElement: ChildElement<T>) => {

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