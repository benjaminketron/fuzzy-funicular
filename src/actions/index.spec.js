import * as actions from './index'
import * as actionTypes from './indexActionTypes'

describe('index actions', () => {
  it('addBooking should create ADD_BOOKING action', () => {
    expect(actions.addBooking({ eventName: 'event1' })).toEqual({
      type: actionTypes.ADD_BOOKING,
      id: 0,
      booking: {
        id: 0,
        eventName: 'event1'
      }
    })
  })

  it('initializeBookings should create an INITIALIZE_BOOKING action', () => {
    var now = new Date(1);
    expect(actions.initializeBookings([])).toEqual({
      type: actionTypes.INITIALIZE_BOOKINGS,
      bookings: []
    })
  })

  it('initializeBookings should set nextBookingId', () => {
    actions.initializeBookings([ { id: 1 } ]);
    expect(actions.addBooking({ eventName: 'event2' })).toEqual({
      type: actionTypes.ADD_BOOKING,
      id: 2,
      booking: {
        id: 2,
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

  it('selectDayBookingClosestTo should create a SELECT_DAY_BOOKING_CLOSEST_TO action', () => {
    var date = new Date(1);
    expect(actions.selectDayBookingClosestTo(date)).toEqual({
      type: actionTypes.SELECT_DAY_BOOKING_CLOSEST_TO,
      date: date
    })
  })

  it('openMenu should create a SET_MENU_OPEN action', () => {
    expect(actions.openMenu()).toEqual({
      type: actionTypes.SET_MENU_OPEN,
      open: true
    })
  })

  it('closeMenu should create a SET_MENU_OPEN action', () => {
    expect(actions.closeMenu()).toEqual({
      type: actionTypes.SET_MENU_OPEN,
      open: false
    })
  })

  it('openMenu should create a MENU_OPEN action', () => {
    expect(actions.openMenu(true)).toEqual({
      type: actionTypes.SET_MENU_OPEN,
      open: true
    })
  })

  it('setCalendarCurrent should create a SET_CALENDAR_CURRENT aciton', () => {
    let date = new Date();
    expect(actions.setCalendarCurrent(date)).toEqual({
      type: actionTypes.SET_CALENDAR_CURRENT,
      current: date
    })
  })

  it('toggleAdd should create a TOGGLE_ADD action', () => {
    expect(actions.toggleAdd()).toEqual({
      type: actionTypes.TOGGLE_ADD
    })
  })

  it('toggleCalendar should create a TOGGLE_CALENDAR action', () => {
    expect(actions.toggleCalendar()).toEqual({
      type: actionTypes.TOGGLE_CALENDAR
    })
  })

  it('toggleSearch should create a TOGGLE_SEARCH action', () => {
    expect(actions.toggleSearch()).toEqual({
      type: actionTypes.TOGGLE_SEARCH
    })
  })
})
