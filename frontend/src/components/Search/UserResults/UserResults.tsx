import './UserResults.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { checkSearchResult } from '../../../slices/searchSlice'
import { ActiveUser } from '../../../types'


interface Props {
    results: ActiveUser[]
}


const UserResults = ({results}: Props ) => {

    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search)


    
    const users = results?.filter(user => user.username.toLowerCase().includes(search.searchTerm.toLowerCase()))

    return (
        <ul className="user-results-list">
            {users?.map((result: ActiveUser) => {
                return(
                    <li key={result.id} >
                        <div className='user-result'>
                            <label htmlFor={result.username}>{result.username}</label>
                            <input 
                                type="radio" 
                                className='user-result-input' 
                                name='userResultsGroup'
                                onChange={() => dispatch(checkSearchResult({newItemId: result.id}))}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>

    )
}

export default UserResults