import { Book  } from "../types"


export type BookSearchState = {
    bookshelfId: number,
    newBookId: number,
}

export type BookSearchAction = {type: 'CHECK_BOOK', payload: number} |  {type: 'ADD_BOOK', payload: Book} 


export default function booksearchReducer(state: BookSearchState, action: BookSearchAction): BookSearchState {
    const { type, payload } = action
    switch(type) {
    
        case "CHECK_BOOK":
            return {...state, newBookId: payload}

        default:
            return state
    }

}