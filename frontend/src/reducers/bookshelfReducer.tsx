import { Bookshelf, Book } from "../types";
import { Data } from "./dataReducer";



export type BookshelfState = {
    data: Bookshelf[] | null,
    error: string,
    isError: boolean
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
                data: state.data
                ? [...state.data, ...action.payload]
                : []

            }
        case 'REMOVE_BOOKSHELF':
            return {
                ...state,
                data: state.data?.filter(
                    (bookshelf) => action.payload.id !== bookshelf.id
                )
            }
        case 'ADD_BOOKSHELF':
            console.log('add bookshelf payload:', action.payload)
            const bookshelfState = {
                ...state,
                data: state.data ? [...state.data, action.payload]
                : [action.payload]
            }
            console.log('add book bookshelf state:', bookshelfState)
            return bookshelfState
        case 'ADD_BOOK':
            return {
                ...state,
                data: state.data?.map(bookshelf => {
                    if (bookshelf.id === action.payload.bookshelfId) {
                        return {...bookshelf, books: [...bookshelf.books, action.payload.newBook]};
                    }
                    return bookshelf;
                })
            }
        case 'REMOVE_BOOK':
            return {
                ...state,
                data: state.data?.map(bookshelf => 
                    bookshelf.id === action.payload.bookshelfId ?
                    {...bookshelf, books: bookshelf.books.filter(
                        (book: Book) => book.id !== action.payload.oldBook.id
                    )}
                    : bookshelf
                ) 
            }
        case 'BOOKSHELF_ERROR':
            return {
                ...state,
                isError: true,
                error: action.payload
            }
            
        default:
            throw new Error()
    }

}

export default bookshelfReducer
    
