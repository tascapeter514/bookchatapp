import { ActiveUser, AuthToken } from "../types";

export type UserState = {
    user: ActiveUser,
    authToken: AuthToken,
    isLoggedIn: boolean,
    isLoading: boolean,
    isError: boolean

}


export type UserFetchInitAction = {
    type: "USER_FETCH_INIT"
}

export type UserLoginAction = {
    type: "LOGIN_ACTIVE_USER",
    payload: {user: ActiveUser, authToken: AuthToken}
}

export type UserLogoutAction = {
    type: 'LOGOUT_ACTIVE_USER',
    payload: {user: ActiveUser, authToken: AuthToken}
}

export type UserFailureAction = {
    type: 'USER_FETCH_FAILURE'
}

export type UserChangeContactAction = {
    type: 'CHANGE_USER_CONTACT',
    payload: {firstName: string, lastName: string, emailAddress: string}
}

export type UserChangePasswordAction = {
    type: 'CHANGE_USER_PASSWORD',
    // payload: {currentPassword: string, newPassword: string}
    payload: string
}

export type UserAction =
    | UserFetchInitAction
    | UserLoginAction
    | UserLogoutAction
    | UserChangeContactAction
    | UserChangePasswordAction
    | UserFailureAction

const userReducer = (
    state: UserState,
    action: UserAction
) => {
    switch(action.type) {

        case 'USER_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }


        case 'LOGIN_ACTIVE_USER':
            return {
                ...state,
                isLoggedIn: true,
                isError: false,
                isLoading: false,
                user: action.payload.user,
                authToken: action.payload.authToken
            }
        case 'USER_FETCH_FAILURE':
            return {
                ...state,
                isLoggedIn: false,
                isError: true,
                isLoading: false,
                user: null,
                authToken: ''

            }
        
        case 'LOGOUT_ACTIVE_USER':
            return {
                ...state,
                isLoggedIn: false,
                isError: false,
                isLoading: false,
                user: null,
                authToken: ''
            }
        
        case 'CHANGE_USER_CONTACT':
            return {
                ...state,
                user: {...state.user, firstName: action.payload.firstName, lastName: action.payload.lastName, emailAddress: action.payload.emailAddress}
            }
            // LOGIC MAY BE OFF -- THINK THROUGH
        case 'CHANGE_USER_PASSWORD':
            return {
                ...state,
                user: {...state.user, password: action.payload}
            }
    }

}

export default userReducer