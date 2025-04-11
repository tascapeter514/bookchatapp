import './UserResults.css'
import { SearchState, SearchAction } from '../../../reducers/searchReducer'
import { ActiveUser } from '../../../types'
import { Dispatch } from 'react'



interface Props {
    children: ActiveUser[]
    search: SearchState,
    dispatchSearch: Dispatch<SearchAction>
}


const UserResults = ({children, search, dispatchSearch}: Props ) => {


    
    const results = children?.filter(child => child.username.toLowerCase().includes(search.value.toLowerCase()))

    return (
        <ul className="user-results-list">
            {results?.map((result: ActiveUser) => {
                return(
                    <li key={result.id} >
                        <div className='user-result'>
                            <label htmlFor={result.username}>{result.username}</label>
                            <input 
                                type="radio" 
                                className='user-result-input' 
                                name='userResultsGroup'
                                onChange={() => dispatchSearch({type: 'CHECK_RESULT', payload: result.id})}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>

    )
}

export default UserResults