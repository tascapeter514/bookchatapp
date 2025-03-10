import './SearchResults.css'


interface searchResultProps<T> {
    searchResults: T[],
    handleSelection: (id: string) => void,
    selectedElement: string | null,
    searchValue: string,
    idKey: keyof T;
    nameKey: keyof T;
}


const SearchResults = <T,> ({searchResults, handleSelection, selectedElement, searchValue, idKey, nameKey}: searchResultProps<T> ) => {


    const searchResultElements = searchResults.filter(searchResult => String(searchResult[nameKey]).toLowerCase().includes(searchValue.toLowerCase())).map((searchResultElement: T, index) => {


        if (!searchResultElement) {
            return null
        }

        return (
            <li key={index} >

                <div className='search-result-wrapper'>
                    <label htmlFor={String(searchResultElement[nameKey])}>{String(searchResultElement[nameKey])}</label>
                    <input 
                        type="radio" 
                        className='search-result-input' 
                        id={String(searchResultElement[nameKey])}
                        name='bookclubGroup'
                        checked={selectedElement === String(searchResultElement[idKey])} 
                        onChange={() => handleSelection(String(searchResultElement[idKey]))}/>
                    
                </div>
                
                

            </li>

        )})


    
    return (
        <ul className="search-results-list">
            {searchResultElements}
        </ul>

    )
}

export default SearchResults