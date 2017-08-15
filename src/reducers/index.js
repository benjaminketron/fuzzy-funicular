import { combineReducers } from 'redux'
import schedule from './schedule'
import mainMenu from './mainMenu'

const scheduleApp = combineReducers({
    schedule,
    mainMenu
})

export default scheduleApp 
