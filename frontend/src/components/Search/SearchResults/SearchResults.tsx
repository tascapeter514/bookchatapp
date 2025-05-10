import './SearchResults.css'
import { SearchResultData, SearchResultsData } from '../../../types'
import { ReactNode } from 'react'




interface Props<T extends SearchResultData | SearchResultsData> {
    searchData: T[],
    children: (data: T[]) => ReactNode
}



const SearchResults = <T extends SearchResultData | SearchResultsData>({
    searchData, 
    children
}: Props<T> ) => {return <div className='search-results'>{children(searchData)}</div>}

export default SearchResults
