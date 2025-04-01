import { Bookshelf, Book } from "../types";



export type BookshelfState = {
    data: Bookshelf[] | null,
    error: string,
    isError: boolean,
    isLoaded: boolean
}


type BookshelfLoadAction = {
    type: 'LOAD_BOOKSHELVES',
    payload: Bookshelf[]
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
    | BookshelfLoadAction
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
        case 'LOAD_BOOKSHELVES':
            
            return {
                ...state,
                data: action.payload,
                isLoaded: true

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
                : action.payload
            }

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
    
