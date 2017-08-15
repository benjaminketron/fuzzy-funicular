import * as actionTypes from '../actions/indexActionTypes'

const mainMenu = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_MENU_OPEN:
            return {
                open: action.open
            }
        default:
            return {
                open: false
            }
    }
}

export default mainMenu;