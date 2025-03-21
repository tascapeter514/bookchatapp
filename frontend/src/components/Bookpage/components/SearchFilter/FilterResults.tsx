import './FilterResults.css'
import { Bookshelf, Bookclub } from '../../../../types'


interface Props {
    children: Bookshelf[] | Bookclub[],
    searchValue: string
}


const FilterResults = ({children, searchValue}: Props  ) => {


    const resultElements = children.filter(
                                        child => child.name.toLowerCase().includes(searchValue.toLowerCase())).map(
                                        (resultElement: Bookshelf | Bookclub) => {

        if (!resultElement) {
            return null
        }

        return (
            <li key={resultElement.id} >

                <div className='search-result-wrapper'>
                    <label htmlFor={resultElement.name}>{resultElement.name}</label>
                    <input 
                        type="radio" 
                        className='search-result-input' 
                        name='searchResultsGroup'
                        />
                    
                </div>
                
                

            </li>

        )})


    
    return (
        <ul className="search-results-list">
            {resultElements}
        </ul>

    )
}

export default FilterResults