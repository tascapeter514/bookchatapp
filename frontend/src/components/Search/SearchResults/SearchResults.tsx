import './SearchResults.css'
import Links from '../../Mappers/Links/Links'
import RadioButtons from '../../Mappers/RadioButtons/RadioButtons'
import { SearchResultData, SearchResultsData, MapperData } from '../../../types'
import { ReactNode } from 'react'




interface Props<T extends SearchResultData | SearchResultsData> {
    searchData: T[],
    // dispatch?: React.Dispatch<any>,
    // action?: (payload: number) => any,
    children: (data: T[]) => ReactNode
}



const SearchResults = <T extends SearchResultData | SearchResultsData>({
    searchData, 
    children
}: Props<T> ) => {return <>{children(searchData)}</>}

export default SearchResults

// if (searchData.length > 0 && 'type' in searchData[0]) {

    //     return(

    //         <Links searchResults={searchData as SearchResultsData[]}/>
    //     )

    // } else if (action && dispatch) {
    //     <RadioButtons
    //         data={searchData as MapperData[]}
    //         dispatch={dispatch}
    //         action={action} 
        
    //     />

    // } else if (dispatch) {

    //     return(

    //         <RadioButtons
    //             data={searchData as MapperData[]}
    //             dispatch={dispatch}
    //         />

    //     )
    // }