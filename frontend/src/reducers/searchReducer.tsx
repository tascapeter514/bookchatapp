
export type SearchState = {
    parentId: number,
    newItemId: number,
}

export type SearchAction = {type: 'CHECK_SEARCH_ITEM', payload: number}


export default function searchReducer(state: SearchState, action: SearchAction): SearchState {
    const { type, payload } = action
    switch(type) {
    
        case "CHECK_SEARCH_ITEM":
            return {...state, newItemId: payload}

        default:
            return state
    }

}