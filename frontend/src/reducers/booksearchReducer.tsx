import { Book, Bookshelf, BookshelfData } from "../types"


export type BookshelfState = {
    bookshelfId: number,
    // books: Book[],
    // bookshelves: Bookshelf[] | [],
    newBookId: number,
}

export type BookSearchAction = {type: 'CHECK_BOOK', payload: number} |  {type: 'ADD_BOOK', payload: Book} 


export default function booksearchReducer(state: BookshelfState, action: BookSearchAction): BookshelfState {
    const { type, payload } = action
    switch(type) {
        // case "ADD_BOOK":
        //     // return {...state, books: [...state.books, payload]}
        //     return {...state, 
        //         bookshelves: state.bookshelves?.map((bookshelf: Bookshelf) => {
        //         return bookshelf.id === state.bookshelfId ?
        //         {...bookshelf, books: [...(bookshelf.books || []), payload] } : bookshelf
        //     })}

        case "CHECK_BOOK":
            return {...state, bookshelfId: payload, newBookId: payload}

        default:
            return state
    }

}