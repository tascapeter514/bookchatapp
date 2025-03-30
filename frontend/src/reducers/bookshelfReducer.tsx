import { Bookshelf, Book } from "../types";
import { Data } from "./dataReducer";



export type BookshelfState = {
    data: Bookshelf[] | Data[]
}


type BookshelfLoadAction = {
    type: 'LOAD_BOOKSHELVES',
    payload: Bookshelf[] | Data[]
}

type BookshelfCreateAction = {
    type: 'ADD_BOOKSHELF',
    payload: Bookshelf | Data
}

type BookshelfDeleteAction = {
    type: 'REMOVE_BOOKSHELF';
    payload: Bookshelf | Data
}

type BookDeleteAction = {
    type: 'REMOVE_BOOK';
    payload: {bookshelfId: number, oldBook: Book | Data}
}

type BookAddAction = {
    type: 'ADD_BOOK';
    payload: {bookshelfId: number, newBook: Book | Data}
}

export type BookshelfAction = 
    | BookshelfLoadAction
    | BookshelfDeleteAction
    | BookshelfCreateAction
    | BookDeleteAction
    | BookAddAction


const bookshelfReducer = (
    state: BookshelfState,
    action: BookshelfAction
) => {

    switch(action.type) {
        case 'LOAD_BOOKSHELVES':
            return {
                ...state,
                data: action.payload

            }
        case 'REMOVE_BOOKSHELF':
            return {
                ...state,
                data: state.data.filter(
                    (bookshelf) => action.payload.id !== bookshelf.id
                )
            }
        case 'ADD_BOOKSHELF':
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case 'ADD_BOOK':
            return {
                ...state,
                data: state.data.map(bookshelf => {
                    if (bookshelf.id === action.payload.bookshelfId) {
                        return {...bookshelf, books: [...bookshelf.books, action.payload.newBook]};
                    }
                    return bookshelf;
                })
            }
        case 'REMOVE_BOOK':
            return {
                ...state,
                data: state.data.map(bookshelf => 
                    bookshelf.id === action.payload.bookshelfId ?
                    {...bookshelf, books: bookshelf.books.filter(
                        (book: Book) => book.id !== action.payload.oldBook.id
                    )}
                    : bookshelf
                ) 
            }
        default:
            throw new Error()
    }

}

export default bookshelfReducer
    
