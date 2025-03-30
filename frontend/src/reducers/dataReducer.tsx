import { Bookshelf, Bookclub, Invitation } from "../types"
export type Data = {

    type?: string,
    [key: string]: any

}

export type DataState = {
    data: Data,
    isLoading: boolean,
    isError: boolean,
    error: string 
}

export type DataFetchInitAction = {
    type: 'DATA_FETCH_INIT'
}

export type DataFetchSuccessAction = {
    type: 'DATA_FETCH_SUCCESS',
    payload: Data
}

export type DataFetchFailureAction = {
    type: 'DATA_FETCH_FAILURE',
    payload: string
}


export type DataAction = 
| DataFetchInitAction
| DataFetchSuccessAction
| DataFetchFailureAction



const dataReducer = (
    state: DataState,
    action: DataAction
) => {
    switch (action.type) {
        case 'DATA_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: ''
            }
        case 'DATA_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                data: action.payload
            }
        case 'DATA_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload
            }
        default: 
            throw new Error()
    }

}

export default dataReducer