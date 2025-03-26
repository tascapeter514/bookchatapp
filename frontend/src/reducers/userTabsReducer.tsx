export type TabState = {
    activeTab: string,
    activeBookshelf: string
}

export type TabAction = {type: 'SET_ACTIVE_TAB', payload: string} | {type: 'SET_BOOKSHELF_TAB', payload: string }




export default function userTabsReducer(state: TabState, action: TabAction) {
    const { type, payload } = action;
    switch(type) {
        case 'SET_ACTIVE_TAB':
            return {activeTab: payload, activeBookshelf: ''};
        case 'SET_BOOKSHELF_TAB':
            return {activeTab: 'bookshelfTab', activeBookshelf: payload};
        default:
            return state
    }

}
