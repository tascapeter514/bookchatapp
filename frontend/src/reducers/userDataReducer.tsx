import { UserData, Bookclub, Bookshelf, Book } from "../types";

// export type UserData = (BookclubData | BookshelfData | InviteData)[]



export type UserState = {userData: UserData}


export type AddBookPayload = {bookshelfId: number, newBook: Book}

export type UserDataAction = 
    {type: 'ADD_BOOK', payload: AddBookPayload } 
    | {type: 'ADD_BOOKCLUB', payload: Bookclub} 
    | {type: 'ADD_BOOKSHELF', payload: Bookshelf}
    | {type: 'SET_INITIAL_DATA', payload: UserData}

export default function userDataReducer(state: UserState, action: UserDataAction) {
    const { type, payload } = action;
    const { userData } = state
    switch(type) {

        case "SET_INITIAL_DATA":
            return {userData: payload}

        case "ADD_BOOKCLUB":
            return {
                userData: userData.map( data => {
                    return data.type === 'bookclub' 
                    ? {...data, items: [...data.items, payload]}
                    : data
    
                })
            }

        case "ADD_BOOKSHELF":
            return {
                userData: userData.map(data => {
                    return data.type === 'bookshelf' 
                    ? {...data, items: [...data.items, payload]}
                    : data
    
                })
    
            }
        case "ADD_BOOK":
            return {
                userData: userData.map(data => {
                    if (data.type === 'bookshelf') {
                        return {
                            ...data,
                            items: data.items.map(item => 
                                'books' in item && item.id === payload.bookshelfId
                                ? {...item, books: [...item.books, payload.newBook]}
                                : item
                            )
                        };
                    }
                    return data
                        
                })
            }

        default:
            return state
            
        
    }

}