import { UserData, Bookclub, Bookshelf, Book } from "../types";



// export type UserData = (BookclubData | BookshelfData | InviteData)[]

export type UserDataAction = {type: 'ADD_BOOK', payload: Book } | {type: 'ADD_BOOKCLUB', payload: Bookclub} | {type: 'ADD_BOOKSHELF', payload: Bookshelf}

export default function userDataReducer(state: UserData, action: UserDataAction) {
    const { type, payload } = action;
    switch(type) {
        case "ADD_BOOKCLUB":
            return state.map( data => {
                return data.type === 'bookclub' 
                ? {...data, items: [...data.items, payload]}
                : data

            });

        case "ADD_BOOKSHELF":
            return state.map( data => {
                return data.type === 'bookshelf' 
                ? {...data, items: [...data.items, payload]}
                : data

            });
        case "ADD_BOOK":
            return {}

        default:
            return state
            
        
    }

}

// setUserData(prevData => 
//     prevData.map(data =>
//         data.type === type
//         ? {...data, items: [...data.items, newItem]}
//         : data
//     )
// )