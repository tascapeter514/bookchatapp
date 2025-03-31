import { Book } from "../types";
import { Data } from "./dataReducer";

export type BookState = {book: Book | Data, isError: boolean, error: string} 

export type BookAction = {type: 'LOAD_BOOK', payload: Book | Data} | {type: 'BOOK_ERROR', payload: string}


export default function bookReducer(state: BookState, action: BookAction) {
    const {type, payload} = action

    switch(type) {
        case "LOAD_BOOK":
            return {
                ...state,
                book: payload
            }

        case 'BOOK_ERROR':
            return {
                ...state,
                isError: true,
                error: payload
            }

        default:
            throw new Error
    }

}