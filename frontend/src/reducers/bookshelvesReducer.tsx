import { Bookshelf, Book } from "../types";



export type BookshelfState = {
    data: Bookshelf[],
    isLoading: boolean,
    isError: boolean
}


type BookshelfFetchInitAction = {
    type: 'BOOKSHELVES_FETCH_INIT'
}

type BookshelfFetchSuccessAction = {
    type: 'BOOKSHELF_FETCH_SUCCESS';
    payload: Bookshelf[]
}

type BookshelfFetchFailureAction = {
    type: 'BOOKSHELF_FETCH_FAILURE'
}

type BookshelfCreateAction = {
    type: 'ADD_BOOKSHELF',
    payload: Bookshelf
}

type BookshelfDeleteAction = {
    type: 'REMOVE_BOOKSHELF';
    payload: Bookshelf
}

type BookDeleteAction = {
    type: 'REMOVE_BOOK';
    payload: {bookshelfId: number, oldBook: Book}
}

type BookAddAction = {
    type: 'ADD_BOOK';
    payload: {bookshelfId: number, newBook: Book}
}

export type BookshelfAction = 
    | BookshelfFetchInitAction
    | BookshelfFetchSuccessAction
    | BookshelfFetchFailureAction
    | BookshelfDeleteAction
    | BookshelfCreateAction
    | BookDeleteAction
    | BookAddAction


const bookshelvesReducer = (
    state: BookshelfState,
    action: BookshelfAction
) => {

    switch(action.type) {
        case 'BOOKSHELVES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'BOOKSHELF_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'BOOKSHELF_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true
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
                        (book) => book.id !== action.payload.oldBook.id
                    )}
                    : bookshelf
                ) 
            }
        default:
            throw new Error()
    }

}

export default bookshelvesReducer
    
