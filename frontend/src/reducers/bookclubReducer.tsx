import { Bookclub } from "../types";


export type BookclubState = {
    data: Bookclub[]
}


export type BookclubLoadAction = {
    type: 'LOAD_BOOKCLUBS',
    payload: Bookclub[]
}

export type BookclubCreateAction = {
    type: 'ADD_BOOKCLUB',
    payload: Bookclub
}

export type BookclubDeleteAction = {
    type: 'REMOVE_BOOKCLUB',
    payload: Bookclub
}

export type BookclubAction =
    | BookclubLoadAction
    | BookclubCreateAction
    | BookclubDeleteAction

const bookclubReducer = (
    state: BookclubState,
    action: BookclubAction

) => {
    switch(action.type) {

        case 'LOAD_BOOKCLUBS':
            return {
                ...state,
                data: action.payload
            }

        case 'ADD_BOOKCLUB':
            return {
                ...state,
                data: [...state.data, action.payload]
            }

        case 'REMOVE_BOOKCLUB':
            return {
                ...state,
                data: state.data.filter(
                    (bookclub) => action.payload.id === bookclub.id
                )
            }
        
        default:
            throw new Error     
    }

}