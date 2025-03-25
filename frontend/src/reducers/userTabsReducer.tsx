type TabState {
    activeTab: number
}

type TabAction = {type: 'SET_ACTIVE_TAB', payload: number} | {type: 'SET_BOOKSHELF_TAB', payload: number }




function userTabsReducer(state: TabState, action: TabAction) {
    const { type, payload } = action;
    switch(type) {
        case 'SET_ACTIVE_TAB':
            return {...state, activeTab: payload};
        case 'SET_BOOKSHELF_TAB':
            return {...state, activeTab: payload};
    }

}
