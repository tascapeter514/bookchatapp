import { Book } from "../types"


export type BookshelfState = {
    id: number,
    books: Book[],
    newBookId: number,
}

export type BookSearchAction = {type: 'CHECK_BOOK', payload: number} |  {type: 'ADD_BOOK', payload: Book} 


export default function booksearchReducer(state: BookshelfState, action: BookSearchAction) {
    const { type, payload } = action
    switch(type) {
        case "ADD_BOOK":
            return {...state, books: [...state.books, payload]}

        case "CHECK_BOOK":
            return {...state, newBookId: payload}
    }

}