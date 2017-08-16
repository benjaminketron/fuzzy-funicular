import { combineReducers } from 'redux'
import schedule from './schedule'
import mainMenu from './mainMenu'
import addBooking from './addBooking'

const scheduleApp = combineReducers({
    schedule,
    mainMenu,
    addBooking
})

export default scheduleApp 
