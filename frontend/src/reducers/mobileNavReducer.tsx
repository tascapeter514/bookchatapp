export type MobileNavState = {
    open: boolean,
    isExiting: boolean
}

export type MobileNavAction = {type: 'OPEN_MOBILE_NAV', payload: boolean} | {type: 'CLOSING_MOBILE_NAV', payload: boolean} | {type: 'CLOSED_MOBILE_NAV', payload: boolean }


function mobileNavReducer(state: MobileNavState, action: MobileNavAction) {
    const {type, payload } = action;
    switch(type) {
        case 'OPEN_MOBILE_NAV':
            return {...state, open: payload, close: false};
        case 'CLOSING_MOBILE_NAV':
            return {...state, isExiting: payload}
        case 'CLOSED_MOBILE_NAV':
            return {...state, isExiting: payload, open: false}

            
        default: 
            return state;

    }

}

export default mobileNavReducer

// | {type: 'CLOSE_MOBILE_NAV', payload: boolean}


// const [showNavbar, setShowNavbar] = useState(false);
// const [isExiting, setIsExiting] = useState(false)

// const toggleNavbar = () => {
//     setShowNavbar(prev => !prev)
//     if (showNavbar) {
//         setIsExiting(true)
//         setTimeout(() => {
//             setShowNavbar(false)
//             setIsExiting(false)
//         }, 350)
//     } else {
//         setShowNavbar(true)
//     }
// }

// const closeNavbar = (open: boolean, close: boolean) =>  {
//     setTimeout(() => {
//         open: false, close: false
//     })

// }