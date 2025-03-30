import { Invitation } from "../types";

export type InviteState = {
    data: Invitation[]
}

export type InviteLoadAction = {
    type: 'LOAD_INVITES',
    payload: Invitation[]

}

export type CreateInviteAction = {
    type: 'ADD_INVITE',
    payload: Invitation
}

export type RemoveInviteAction = {
    type: 'REMOVE_INVITE',
    payload: Invitation
}

export type InviteAction = 
    | InviteLoadAction
    | CreateInviteAction
    | RemoveInviteAction

const inviteReducer = (
    state: InviteState,
    action: InviteAction
) => {
    switch(action.type) {
        case 'LOAD_INVITES':
            return {
                ...state,
                data: action.payload
            }
        case 'ADD_INVITE':
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        
        case 'REMOVE_INVITE':
            return {
                ...state,
                data: state.data.filter(
                    (invite) => action.payload.id !== invite.id
                )
            }

        default:
            throw new Error
    }
}


export default inviteReducer