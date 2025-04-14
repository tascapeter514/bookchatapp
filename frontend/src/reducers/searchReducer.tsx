

export type SearchState = {
    value: string,
    resultId: number
}


export type SearchAction = {type: 'START_SEARCH', payload: string} | {type: 'CHECK_RESULT', payload: number}

const searchReducer = (state: SearchState, action: SearchAction) => {
    const {type, payload} = action

    switch(type){

        case 'START_SEARCH':
            return {
                ...state,
                value: payload
            }


        case 'CHECK_RESULT':
            return {
                ...state,
                resultId: payload
            }
        
        default:
            throw new Error('search reducer error')
    }

}

export default searchReducer