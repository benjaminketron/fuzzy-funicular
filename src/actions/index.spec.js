import * as actions from './index'
import * as actionTypes from './indexActionTypes'

describe('index actions', () => {
  it('addBooking should create ADD_BOOKING action', () => {
    expect(actions.addBooking({ eventName: 'event1' })).toEqual({
      type: actionTypes.ADD_BOOKING,
      id: 0,
      booking: {
        eventName: 'event1'
      }
    })
  })

  it('initializeBookings should create an INITIALIZE_BOOKING action', () => {
    var today = new Date(1);
    expect(actions.initializeBookings([], today)).toEqual({
      type: actionTypes.INITIALIZE_BOOKINGS,
      bookings: [],
      today: today
    })
  })

  it('initializeBookings should set nextBookingId', () => {
    actions.initializeBookings([ { id: 1 } ]);
    expect(actions.addBooking({ eventName: 'event2' })).toEqual({
      type: actionTypes.ADD_BOOKING,
      id: 2,
      booking: {
        eventName: 'event2'
      } 
    })
  })

  it('searchBooking should create a SEARCH_BOOKING action', () => {
    expect(actions.searchBooking('event2')).toEqual({
      type: actionTypes.SEARCH_BOOKING,
      searchText: 'event2'
    })
  })

  it('selectDay should create a SELECT_DAY action', () => {
    var date = new Date(1);
    expect(actions.selectDay(date)).toEqual({
      type: actionTypes.SELECT_DAY,
      date: date
    })
  })

  it('selectBookingClosestTo should create a SELECT_BOOKING_CLOSEST_TO action', () => {
    var date = new Date(1);
    expect(actions.selectBookingClosestTo(date)).toEqual({
      type: actionTypes.SELECT_BOOKING_CLOSEST_TO,
      date: date
    })
  })
})
