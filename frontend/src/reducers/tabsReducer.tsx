export type TabState = {
    activeTab: string,
    activeBookshelf: string,
    showNav?: boolean
}

export type TabAction = {type: 'SET_ACTIVE_TAB', payload: string} | {type: 'SET_BOOKSHELF_TAB', payload: string } | {type: 'SHOW_NAV'}




export default function tabsReducer(state: TabState, action: TabAction) {
    const { type, payload } = action;
    switch(type) {
        case 'SET_ACTIVE_TAB':
            return {activeTab: payload, activeBookshelf: ''};
        case 'SET_BOOKSHELF_TAB':
            return {activeTab: 'bookshelfTab', activeBookshelf: payload};
        case 'SHOW_NAV':
            return {...state, showNav: !state.showNav}
        default:
            return state
    }

}
