import { UserData, Bookclub, Bookshelf, Book } from "../types";


type Data = {
    type: string,
    [key: string]: any

}

type DataState = {
    data: null,
    isLoading: boolean,
    isError: boolean 
}

type DataFetchInitAction = {
    type: 'DATA_FETCH_INIT'
}

type DataFetchSuccessAction = {
    type: 'DATA_FETCH_SUCCESS',
    payload: 
}





export default function socketReducer(state: UserState, action: UserDataAction) {
    const { type, payload } = action;
    const { userData } = state
    switch(type) {

       

}