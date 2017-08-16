import * as actionTypes from './indexActionTypes'

let nextBookingId = 0
export const addBooking = (booking) => ({
  type: actionTypes.ADD_BOOKING,
  id: nextBookingId,
  booking: {...booking, id: nextBookingId++}
})

export const searchBooking = (searchText) => ({
  type: actionTypes.SEARCH_BOOKING,
  searchText: searchText
})

export const selectDay = (date) => ({
  type: actionTypes.SELECT_DAY,
  date: date
})

export const selectDayBookingClosestTo = (date) => ({
  type: actionTypes.SELECT_DAY_BOOKING_CLOSEST_TO,
  date: date
})

export const openMenu = () => ({
  type: actionTypes.SET_MENU_OPEN,
  open: true
})

export const closeMenu = () => ({
  type: actionTypes.SET_MENU_OPEN,
  open: false
})

export const setCalendarCurrent = (date) => ({
  type: actionTypes.SET_CALENDAR_CURRENT,
  current: date
})

export const setMenuOpen = (open) => ({
  type: actionTypes.SET_MENU_OPEN,
  open: open
})

export const toggleAdd = () => ({
  type: actionTypes.TOGGLE_ADD
})

export const toggleCalendar = () => ({
  type: actionTypes.TOGGLE_CALENDAR
})

export const toggleSearch = () => ({
  type: actionTypes.TOGGLE_SEARCH
})

export const setAddEventName = (eventName) => ({
  type: actionTypes.SET_ADD_EVENT_NAME,
  eventName: eventName
}); 

export const setAddRoomName = (roomName) => ({
  type: actionTypes.SET_ADD_ROOM_NAME,
  roomName: roomName
}); 

export const setAddStartDate = (startDate) => ({
  type: actionTypes.SET_ADD_START_DATE,
  startDate: startDate
}); 

export const setAddStartTime = (startTime) => ({
  type: actionTypes.SET_ADD_START_TIME,
  startTime: startTime
}); 

export const setAddEndDate = (endDate) => ({
  type: actionTypes.SET_ADD_END_DATE,
  endDate: endDate
}); 

export const setAddEndTime = (endTime) => ({
  type: actionTypes.SET_ADD_END_TIME,
  endTime: endTime
}); 
