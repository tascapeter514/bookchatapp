import { UserData } from "../types";



// export type UserData = (BookclubData | BookshelfData | InviteData)[]

export type UserDataAction = {type: 'ADD_BOOK', payload: {
    bookshelfId: number,
    bookId: number,
    
}} | {type: 'ADD_BOOKCLUB', payload: string} | {type: 'ADD_BOOKSHELF', payload: string}

export default function userDataReducer(state: UserData, action: UserDataAction) {
    const { type, payload } = action;
    switch(type) {
        case "ADD_BOOK":
            return [...state, ]
        
    }

}