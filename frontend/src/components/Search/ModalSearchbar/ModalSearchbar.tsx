import './ModalSearchbar.css'
import SearchResults from '../SearchResults/SearchResults'
import SearchInput from '../SearchInput/SearchInput'
import useSearch from '../../../hooks/useSearch'
import { SearchResultData } from '../../../types'
import RadioButtons from '../../Mappers/RadioButtons/RadioButtons'
import { useReducer } from 'react'
import searchReducer from '../../../reducers/searchReducer'


interface Props {
    url: string
}

const ModalSearchbar = ({url}: Props) => {

    const {searchResults, searchValue, setSearchValue} = useSearch(url)
    const [searchState, dispatchSearch] = useReducer(searchReducer, {parentId: NaN, newItemId: NaN})

    console.log('modal searchbar state:', searchState)

    return (
            <div className="modal-searchbar">
                <SearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
                {
                    searchValue && searchResults.length > 0 && (
                        <SearchResults searchData={searchResults as SearchResultData[]}>
                            {searchData => (
                                <>
                                    <RadioButtons
                                        data={searchData}
                                        dispatch={dispatchSearch}
                                    />
                                </>

                            )}
                        </SearchResults>
                    )
                }
            </div>
            
            
        

    )
}

export default ModalSearchbar


