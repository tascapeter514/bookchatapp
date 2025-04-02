import { Bookshelf, Book } from "../types";



export type BookshelfState = {
    data: Bookshelf[] | null,
    error: string,
    isError: boolean,
    isLoaded: boolean
}

type BookshelfFetchInitAction = {
    type: "BOOKSHELVES_FETCH_INIT"
}

type BooksehlfFetchSuccessAction = {
    type: 'BOOKSHELVES_FETCH_SUCCESS',
    payload: Bookshelf[]
}

type BookshelfFetchFailureAction = {
    type: 'BOOKSHELVES_FETCH_FAILURE',
    payload: string
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

type BookshelfFailureAction = {
    type: 'BOOKSHELF_ERROR',
    payload: string
}

export type BookshelfAction = 
    | BookshelfFetchInitAction
    | BooksehlfFetchSuccessAction
    | BookshelfFetchFailureAction
    | BookshelfDeleteAction
    | BookshelfCreateAction
    | BookDeleteAction
    | BookAddAction
    | BookshelfFailureAction


const bookshelfReducer = (
    state: BookshelfState,
    action: BookshelfAction
) => {
    console.log('reducer - action', action)
    console.log('reducer -- state:', state)
    

    switch(action.type) {
        case 'BOOKSHELVES_FETCH_INIT':
            
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: ''

            }

        case 'BOOKSHELVES_FETCH_SUCCESS':

            return {
                ...state,
                isLoading: false,
                isError: false,
                error: '',
                data: action.payload
            }

        case 'BOOKSHELVES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload
            }

        
        case 'REMOVE_BOOKSHELF':
            return {
                ...state,
                data: state.data ? state.data.filter(
                    (bookshelf) => action.payload.id !== bookshelf.id
                ) : null
            }
        case 'ADD_BOOKSHELF':
            console.log('add bookshelf payload:', action.payload)
            return {
                ...state,
                data: state.data ? [...state.data, action.payload]
                : [action.payload]
            }
            // EMPTY ARRAY PROBLEM
        case 'ADD_BOOK':
            return {
                ...state,
                data: state.data ? state.data.map(bookshelf => {
                    if (bookshelf.id === action.payload.bookshelfId) {
                        return {...bookshelf, books: [...bookshelf.books, action.payload.newBook]};
                    }
                    return bookshelf;
                }) : null
            }
        case 'REMOVE_BOOK':
            return {
                ...state,
                data: state.data ? state.data.map(bookshelf => 
                    bookshelf.id === action.payload.bookshelfId 
                    ? {...bookshelf, books: bookshelf.books.filter((book: Book) => book.id !== action.payload.oldBook.id)}
                    : bookshelf
                ) : null
            }
        case 'BOOKSHELF_ERROR':
            return {
                ...state,
                isError: true,
                isLoaded: false,
                error: action.payload
            }
            
        default:
            throw new Error()
    }

}

export default bookshelfReducer
    
