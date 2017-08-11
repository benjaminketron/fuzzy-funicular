import * as actionTypes from './indexActionTypes'

let nextBookingId = 0
export const addBooking = (booking) => ({
  type: actionTypes.ADD_BOOKING,
  id: nextBookingId++,
  booking: booking
})

export const initializeBookings = (bookings, today) => {
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
    bookings: bookings,
    today: today
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

export const selectBookingClosestTo = (date) => ({
  type: actionTypes.SELECT_BOOKING_CLOSEST_TO,
  date: date
})
