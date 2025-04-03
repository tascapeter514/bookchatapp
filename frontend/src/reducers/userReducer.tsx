import { ActiveUser, AuthToken } from "../types";

export type UserState = {
    user: ActiveUser | null,
    authToken: AuthToken | null,
    isLoggedIn: boolean,
    isLoading: boolean,
    isError: boolean,
    error: string

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
    payload: {user: ActiveUser | null, authToken: AuthToken}
}

export type UserFailureAction = {
    type: 'USER_ERROR',
    payload: string
}

export type UserClearFailureAction = {
    type: 'CLEAR_ERROR'
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
    | UserClearFailureAction

const userReducer = (
    state: UserState,
    action: UserAction
) => {

    console.log('user reducer state:', state)
    console.log('user reducer action:', action)
    switch(action.type) {

        case 'USER_FETCH_INIT':
            console.log('USER_FETCH_INIT')
            return {
                ...state,
                isLoading: true,
                isError: false,
                error: ''
            }


        case 'LOGIN_ACTIVE_USER':
            console.log('log in state:', state)
            console.log('log in action:', action)
            return {
                ...state,
                isLoggedIn: true,
                isError: false,
                isLoading: false,
                user: action.payload.user,
                authToken: action.payload.authToken,
                error: ''
            }
        case 'USER_ERROR':
            return {
                ...state,
                error: action.payload,
                isError: true,
                isLoggedIn: false,
                isLoading: false,
                user: null,
                authToken: ''

            }
        
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: '',
                isError: false
            }
        
        
        case 'LOGOUT_ACTIVE_USER':
            return {
                ...state,
                isLoggedIn: false,
                isError: false,
                isLoading: false,
                user: null,
                authToken: '',
                error: ''
            }
        
        case 'CHANGE_USER_CONTACT':
            if (!state.user) {
                return state
            }
            return {
                ...state,
                user: {...state.user, firstName: action.payload.firstName, lastName: action.payload.lastName, emailAddress: action.payload.emailAddress}
            }
            // LOGIC MAY BE OFF -- THINK THROUGH
        case 'CHANGE_USER_PASSWORD':
            if (!state.user) {
                return state
            }
            return {
                ...state,
                user: {...state.user, password: action.payload}
            }
    }

}

export default userReducer