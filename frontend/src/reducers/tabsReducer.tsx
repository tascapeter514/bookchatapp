export type TabState = {
    activeTab: string,
    activeBookshelf: string,
    showNav?: boolean
}

export type TabAction = {type: 'SET_ACTIVE_TAB', payload: string} | {type: 'SET_BOOKSHELF_TAB', payload: string } | {type: 'SHOW_NAV'}




export default function tabsReducer(state: TabState, action: TabAction) {
    
    switch(action.type) {
        case 'SET_ACTIVE_TAB':
            return {activeTab: action.payload, activeBookshelf: ''};
        case 'SET_BOOKSHELF_TAB':
            return {activeTab: 'bookshelfPanel', activeBookshelf: action.payload};
        case 'SHOW_NAV':
            return {...state, showNav: !state.showNav}
        default:
            return state
    }

}
