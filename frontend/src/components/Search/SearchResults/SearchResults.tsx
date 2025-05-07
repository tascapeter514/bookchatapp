import './SearchResults.css'
import Links from '../../Mappers/Links/Links'
import RadioButtons from '../../Mappers/RadioButtons/RadioButtons'
import { SearchResultData, SearchResultsData, MapperData } from '../../../types'


interface Props {
    searchData: SearchResultData[] | SearchResultsData[],
    dispatch?: React.Dispatch<any>,
    action?: (payload: number) => any
}



const SearchResults = ({searchData, dispatch, action}: Props ) => {

    if (searchData.length > 0 && 'type' in searchData[0]) {

        return(

            <Links searchResults={searchData as SearchResultsData[]}/>
        )

    } else if (action && dispatch) {
        <RadioButtons
            data={searchData as MapperData[]}
            dispatch={dispatch}
            action={action} 
        
        />

    } else if (dispatch) {

        return(

            <RadioButtons
                data={searchData as MapperData[]}
                dispatch={dispatch}
            />

        )
    }

}

export default SearchResults