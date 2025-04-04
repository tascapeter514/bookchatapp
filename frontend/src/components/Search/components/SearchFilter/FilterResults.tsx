import './FilterResults.css'
import { Dispatch } from 'react'
import { BookshelfState } from '../../../../reducers/bookshelfReducer'
import { BookclubState } from '../../../../reducers/bookclubReducer'
import { Bookshelf, Bookclub } from '../../../../types'
import { Data } from '../../../../reducers/dataReducer'
 import { SearchState, SearchAction } from '../../../../reducers/searchReducer'


interface Props {
    children: BookshelfState | BookclubState,
    search: SearchState,
    dispatchSearch: Dispatch<SearchAction>

}


const FilterResults = ({children, search, dispatchSearch}: Props  ) => {


    
    const results = children.data.filter(child => child.name.toLowerCase().includes(search.value.toLowerCase()))

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
                        onChange={() => dispatchSearch({type: 'CHECK_RESULT', payload: resultElement.id})}
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