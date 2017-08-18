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

  it('addBooking should create INITIALIZE_BOOKINGS action', () => {
    let bookings = [];
    expect(actions.initializeBookings(bookings)).toEqual({
      type: actionTypes.INITIALIZE_BOOKINGS,
      bookings: bookings
    })
  })

  it('focus should create a FOCUS action', () => {
    let element = {};
    let day = {};
    expect(actions.focus(day, element)).toEqual({
      type: actionTypes.FOCUS,
      day: day,
      element: element
    })
  })

  it('focus should create an UNFOCUS action', () => {
    let element = {};
    let day = {};
    expect(actions.unfocus()).toEqual({
      type: actionTypes.UNFOCUS
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

  it('setAddEventName should create a SET_ADD_EVENT_NAME action', () => {
    expect(actions.setAddEventName('event')).toEqual({
      type: actionTypes.SET_ADD_EVENT_NAME,
      eventName: 'event'
    })
  })

  it('setAddRoomName should create a SET_ADD_ROOM_NAME action', () => {
    expect(actions.setAddRoomName('room')).toEqual({
      type: actionTypes.SET_ADD_ROOM_NAME,
      roomName: 'room'
    })
  })
  
  it('setAddStartDate should create a SET_ADD_START_DATE action', () => {
    expect(actions.setAddStartDate('August 8, 2017')).toEqual({
      type: actionTypes.SET_ADD_START_DATE,
      startDate: 'August 8, 2017'
    })
  })

  it('setAddStartTime should create a SET_ADD_START_TIME action', () => {
    expect(actions.setAddStartTime('11:11 am')).toEqual({
      type: actionTypes.SET_ADD_START_TIME,
      startTime: '11:11 am'
    })
  })

  it('setAddEndDate should create a SET_ADD_END_DATE action', () => {
    expect(actions.setAddEndDate('August 9, 2017')).toEqual({
      type: actionTypes.SET_ADD_END_DATE,
      endDate: 'August 9, 2017'
    })
  })

  it('setAddEndTime should create a SET_ADD_END_TIME action', () => {
    expect(actions.setAddEndTime('11:11 pm')).toEqual({
      type: actionTypes.SET_ADD_END_TIME,
      endTime: '11:11 pm'
    })
  })  

  it('setToday should create a SET_TODAY action', () => {
    let today = new Date();
    expect(actions.setToday(today)).toEqual({
      type: actionTypes.SET_TODAY,
      today: today
    })
  })
})
