import './ModalSearchbar.css'
import { Dispatch } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import SearchInput from '../SearchInput/SearchInput'
// import useSearch from '../../../hooks/useSearch'
import { SearchResultData } from '../../../types'
import RadioButtons from '../../Mappers/RadioButtons/RadioButtons'


interface Props {
    searchResults: SearchResultData[],
    searchValue: string,
    setSearchValue: Dispatch<string>,
    setSelection: Dispatch<number>

}

const ModalSearchbar = ({searchValue, searchResults, setSearchValue, setSelection}: Props) => {

    // const {searchResults, searchValue, setSearchValue} = useSearch(url)



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
                                        dispatch={setSelection}
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


