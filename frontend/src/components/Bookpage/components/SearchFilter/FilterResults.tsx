import './FilterResults.css'
import { BookshelfState } from '../../../../reducers/bookshelfReducer'
import { BookclubState } from '../../../../reducers/bookclubReducer'
import { Bookshelf, Bookclub } from '../../../../types'
import { Data } from '../../../../reducers/dataReducer'


interface Props {
    children: BookshelfState | BookclubState,
    searchValue: string
}


const FilterResults = ({children, searchValue}: Props  ) => {

    const results = children.data.filter(child => child.name.toLowerCase().includes(searchValue.toLowerCase()))

    const resultElements = results.map(
            ((resultElement: Bookshelf | Bookclub | Data) => {

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

        )}))


    
    return (
        <ul className="search-results-list">
            {resultElements}
        </ul>

    )
}

export default FilterResults