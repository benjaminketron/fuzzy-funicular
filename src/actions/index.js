import * as actionTypes from './indexActionTypes'

let nextBookingId = 0
export const addBooking = (booking) => ({
  type: actionTypes.ADD_BOOKING,
  id: nextBookingId,
  booking: {...booking, id: nextBookingId++}
})

export const initializeBookings = (bookings) => {
  let lastBookingId = 0;
  
  if (!!bookings) {
    bookings.forEach(function(element) {
      if (!!element) {
        if (element.id > lastBookingId) {
          lastBookingId = element.id
        }
      }
    }, this);
    
    nextBookingId = lastBookingId + 1; 
  }
  return {
    type: actionTypes.INITIALIZE_BOOKINGS,
    bookings: bookings
  }
};

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
