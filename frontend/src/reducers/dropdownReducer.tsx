export type DropdownState = {
    isRotated: boolean,
    activePanel: boolean
}


export type DropDownAction = {type: 'TOGGLE_DROPDOWN'}

const dropdownReducer = (state: DropdownState, action: DropDownAction) => {

    switch(action.type) {
        case 'TOGGLE_DROPDOWN':
            return {...state, activePanel: !state.activePanel, isRotated: !state.isRotated}
    }
}

export default dropdownReducer