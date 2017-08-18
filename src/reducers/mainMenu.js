import * as actionTypes from '../actions/indexActionTypes'

const mainMenu = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_MENU_OPEN:
            return {
                open: action.open
            }
            break; // eslint-disable-line 
        default:
            return {
                open: false
            }
            break; // eslint-disable-line 
    }
}

export default mainMenu;