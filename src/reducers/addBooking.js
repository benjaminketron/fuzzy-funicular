import * as actionTypes from '../actions/indexActionTypes'
import { List, Map } from 'immutable'

// considered a combine reducer but when adding bookings it is necesary to know about bookings when 
// calculating the next state for days. it seems moving other parts of the state with a sub reducer is considered
// an anit-pattern, but might simplify the code a bit and be worth looking into
const addBooking = (state = 
    {
      eventName: '',
      roomName: ''
    }, action) => {

  switch(action.type) {
    case actionTypes.TOGGLE_ADD:
        return {
            eventName: '',
            roomName: ''
        }
    case actionTypes.SET_ADD_EVENT_NAME: 
        return {...state,
            eventName: action.eventName
        }
    case actionTypes.SET_ADD_ROOM_NAME: 
        return {...state,
            roomName: action.roomName
        }
    case actionTypes.SET_ADD_START_DATE:
        return {...state,
            start: calculateDateFromDateAndTime(action.startDate, state.startTime),
            startDate: action.startDate
        }  
    case actionTypes.SET_ADD_START_TIME:
        return {...state,
            start: calculateDateFromDateAndTime(state.startDate, action.startTime),
            startTime: action.startTime
        }       
    case actionTypes.SET_ADD_END_DATE: 
        return {...state,
            end: calculateDateFromDateAndTime(action.endDate, state.endTime),
            endDate: action.endDate
        }  
    case actionTypes.SET_ADD_END_TIME:
        return {...state,
            end: calculateDateFromDateAndTime(state.endDate, action.endTime),
            endTime: action.endTime
        }      
    case actionTypes.ADD_BOOKING:
        let errorMessage = 'This field is required.'
        let errorMessages = {
            eventNameError: !!state.eventName ? '' : errorMessage,
            startDateError: !!state.startDate ? '' : errorMessage,
            startTimeError: !!state.startTime ? '' : errorMessage,
            endDateError: !!state.endDate ? '' : errorMessage,
            endTimeError: !!state.endTime ? '' : errorMessage,
        }
        
        return Object.assign({}, state, errorMessages)
    default: 
        return {...state };    
  }
}

const calculateDateFromDateAndTime = (date, time) => {
    let result = null;
    if (date &&
        time) {
        result = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
    }
    else if (date) {
        result = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    return result;
}

export default addBooking;