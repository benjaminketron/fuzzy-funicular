import * as actionTypes from '../actions/indexActionTypes'
import { List, Map } from 'immutable'

// considered a combine reducer but when adding bookings it is necesary to know about bookings when 
// calculating the next state for days. it seems moving other parts of the state with a sub reducer is considered
// an anit-pattern, but might simplify the code a bit and be worth looking into
export const schedule = (state = {}, action) => {
  let bookings = null;
  let days = null;

  switch (action.type) {
    case actionTypes.ADD_BOOKING:
      bookings = addBookingToBookings(state.bookings, action);
      days = addBookingToDays(state.days, state.bookings, action);
      return { 
        ...state, 
        days: days,
        bookings: bookings
      }    
      break;
    case actionTypes.INITIALIZE_BOOKINGS:
      bookings = {};
      for (let b = 0; b < action.bookings.length; b++) {
        let booking = action.bookings[b];
        bookings[booking.id] = booking
      }
      return {
        ...state,
        now: action.now,
        bookings: bookings
      }
      break;
    case actionTypes.SEARCH_BOOKING:
      let searchText = !!action.searchText ? action.searchText.toLowerCase() : '';

      // rudimentary search. needs to be refactored to a keyword search and collect keyword
      // information about bookings as they are inserted or initialize
      // could use a Map or OrderedMap (keyword -> booking id)
      // algorithm would strip punctionation and tokenize by whitespace discarding empty tokens
      // the same algorithm could be used to tokenize the search string
      let bookingsMap = Map(state.bookings);
      let bookingsToHide = bookingsMap.filter((booking) => {
        return !(
          (!!booking.eventName ? booking.eventName.toLowerCase() : '').indexOf(searchText) != -1 ||
          (!!booking.roomName ? booking.roomName.toLowerCase() : '').indexOf(searchText) != -1
        );
      })

      let bookingsToShow = bookingsMap.filter((booking) => {
        return booking.hidden = true;
      })

      let updatedBookings = {};

      bookingsToShow.forEach((booking) => {
        let _booking = {...booking, hidden: false };
        updatedBookings[booking.id] = _booking;
      })

      bookingsToHide.forEach((booking) => {
        let _booking = {...booking, hidden: true };
        updatedBookings[booking.id] = _booking;
      })

      return {...state,
        bookings: Object.assign({}, state.bookings, updatedBookings)
      }
      break;
    case actionTypes.SELECT_DAY:
      days = List(state.days || []);
      
      let daysToUnfocus = days.filter((day) => {
        return day.focus;
      });

      let daysToFocus = days.filter((day) => {
        if (!!day.end) {
        }
        return day.date.getTime() == action.date.getTime() || 
          (!!day.end && day.date.getTime() <= action.date.getTime() && action.date.getTime() <= day.end.getTime());
      })

      daysToUnfocus.forEach((day) => {
        let index = days.indexOf(day);
        days = days.remove(index);
        
        let newDay = {...day, focus: false };

        days = days.insert(index, newDay);
      });

      daysToFocus.forEach((day) => {
        let index = days.indexOf(day);
        days = days.remove(index);
        
        let newDay = {...day, focus: true };

        days = days.insert(index, newDay);
      });

      return {...state,
        days: days.toJS()
      }
      break;
    
    default:
      return state;
  }
  // switch (action.type) {
  //   case 'ADD_TODO':
  //     return [
  //       ...state,
  //       {
  //         id: action.id,
  //         text: action.text,
  //         completed: false
  //       }
  //     ]
  //   case 'TOGGLE_TODO':
  //     return state.map(todo =>
  //       (todo.id === action.id) 
  //         ? {...todo, completed: !todo.completed}
  //         : todo
  //     )
  //   default:
  //     return state
  // }
}

export const addBookingToBookings = (bookings, action) => {
  let newBookings = { ...bookings };
  newBookings[action.id] = { ...action.booking, id: action.id};
  return newBookings;
}

// TODO refactor not as scalable as it could be
// assuming the booking itself can span multiple days
export const addBookingToDays = (days, bookings, action) => {
  // if day(s) do not exist for booking create them
  let booking = action.booking;
  let result = List(createDaysIfNotExist(days, booking));
  let startDate = booking.start;
  let startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  let endDate = booking.end;
  let endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  // collect days effected by booking
  let bookedDays = result.filter((d) => {
    return startDay <= d.date && d.date <= endDay;
  })

  // add booking to each day in chronological order ascending, and duration descending
  bookedDays.forEach(function(day) {
    let bookingIds = List(day.bookingIds || []);

    let index = 0;
    for (let i = 0; i < bookingIds.size; i++) {
      let _booking = bookings[bookingIds.get(i)];
      if (booking.start < _booking.start && (booking.end - booking.start) < (_booking.end - _booking.start)) {
        index = i;
      }
    }

    bookingIds = bookingIds.insert(index, booking.id);

    let updatedDay = {...day, bookingIds: bookingIds.toJS() };

    // bad idea but resusing for the moment
    index = result.indexOf(day);
    result = result.remove(index);

    result = result.insert(index, updatedDay);
    
  }, this);

  return result.toJS();
}

// also splits ranges as necessary
// TODO needs a bit of cleanup / segmentation into smaller bits
export const createDaysIfNotExist = (days, booking) => {
  let result = List(days || []);
  // just add days if nothing exists
  if (!result.size) {
    let days = booking.end.getDate() - booking.start.getDate();
    for (let d = 0; d <= days; d++) {
      result = result.push({
        date: new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate() + d),
        bookingIds: []
      });
    }
    
  } else {
    let pastDay = result.get(0)
    let pastDate = pastDay.date;
    let futureDay = result.get(result.size - 1);
    let futureDate = (futureDay.end || futureDay.date)

    // we have days to create in the past
    if (booking.start < pastDate) {
      // both booking start and end are before the past date
      // so we may have a range to create in between
      if (booking.end < pastDate) {
          let days = Math.round(booking.end - booking.start) / (1000*60*60*24);
          for (let d = 0; d <= days; d++) {
            result = result.insert(d, {
              date: new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate() + d),
              bookingIds: []
            });
          }

          // create range in between booking end and past date if necessary
          let rangeStart = new Date(booking.end.getFullYear(), booking.end.getMonth(), booking.end.getDate() + 1);
          let rangeEnd = new Date(pastDate.getFullYear(), pastDate.getMonth(), pastDate.getDate() - 1);
          if (rangeEnd >= rangeStart) {
            let index = result.indexOf(pastDay);
            result = result.insert(index, {
              date: rangeStart,
              end: rangeEnd,
              bookingIds: []
            });
          }
      }
      // no range necessary as booking end date is after the past date
      else 
      {
        let days = Math.round(pastDate - booking.start) / (1000*60*60*24);
        for (let d = 0; d < days; d++) {
          let date = new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate() + d);
          if (!result.contains((day) => {
            return day.date == date;
          })) {
            result = result.insert(d, {
              date: date,
              bookingIds: []
            });
          }
        }
      }
    }

    // we have days to create in the future
    if (booking.end > futureDate) {
      let offset = result.indexOf(futureDay) + 1;
      // there may be a range inbetween booking start and future date to be created
      if (futureDate < booking.start) {
        let days = Math.round(booking.end - booking.start) / (1000*60*60*24);
        for (let d = 0; d <= days; d++) {
          result = result.insert(offset + d, {
            date: new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate() + d),
            bookingIds: []
          });
        }

        // create range in between future date and booking start if necessary
        let rangeStart = new Date(futureDate.getFullYear(), futureDate.getMonth(), futureDate.getDate() + 1);
        let rangeEnd = new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate() - 1);
        if (rangeEnd >= rangeStart) {
          let index = result.indexOf(futureDay);
          result = result.insert(index + 1, {
            date: rangeStart,
            end: rangeEnd,
            bookingIds: []
          });
        }
      }
      // no range necessary as booking start is before future date
      else {
        let days = Math.round(booking.end - futureDate) / (1000*60*60*24);
        for (let d = 1; d < days; d++) {
          let date = new Date(futureDate.getFullYear(), futureDate.getMonth(), futureDate.getDate() + d);
          if (!result.contains((day) => {
            return day == date;
          })) {
            result = result.insert(offset + d, {
              date: date,
              bookingIds: []
            });
          }
        }
      }
    }

    let bookingStartDay = new Date(booking.start.getFullYear(), booking.start.getMonth(), booking.start.getDate());
    let bookingEndDay = new Date(booking.end.getFullYear(), booking.end.getMonth(), booking.end.getDate());
    // if any of the days in between are a range then expand as necessary
    let dateRanges = result.filter((day) => {
      return !!day.end && (bookingStartDay <= day.date && day.date <= bookingEndDay ||
        bookingStartDay <= day.end && day.end <= bookingEndDay);
    }) 

    dateRanges.forEach((day) => { 
      // if date range is completely in booking
      if (bookingStartDay <= day.date && day.date <= bookingEndDay &&
        bookingStartDay <= day.end && day.end <= bookingEndDay)
      {
        let index = result.indexOf(day);
        result = result.remove(index);
        let days = Math.round(day.end - day.date) / (1000 * 60 * 60 * 24);
        for (let d = 0; d <= days; d++) {
          result = result.insert(index + d, {
            date: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate() + d),
            bookingIds: []
          })
        }
      }
      // if left part of date range is in booking
      else if (bookingStartDay <= day.date && day.date <= bookingEndDay) {
        let index = result.indexOf(day);
        result = result.remove(index);
        let days = Math.round(bookingEndDay - day.date) / (1000 * 60 * 60 * 24);
        for (let d = 0; d <= days; d++) {
          result = result.insert(index + d, {
            date: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate() + d),
            bookingIds: []
          })
        }

        // insert missing range
        result = result.insert(index + days + 1, {
          date: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate() + days + 1),
          end: day.end,
          bookingIds: []
        })
      }
      // if right part fo date range is in booking
      else if (bookingStartDay <= day.end && day.end <= bookingEndDay) {
        let index = result.indexOf(day);
        result = result.remove(index);
        
        let range = {
          date: day.date,
          bookingIds: []
        };

        let rangeEnd = new Date(bookingStartDay.getFullYear(), bookingStartDay.getMonth(), bookingStartDay.getDate() - 1);
        if (rangeEnd > day.date) {
          range.end = rangeEnd;
        }
        // insert missing range
        result = result.insert(index, range);

        let days = Math.round(day.end - bookingStartDay) / (1000 * 60 * 60 * 24);
        for (let d = 0; d <= days; d++) {
          result = result.insert(index + d + 1, {
            date: new Date(bookingStartDay.getFullYear(), bookingStartDay.getMonth(), bookingStartDay.getDate() + d),
            bookingIds: []
          })
        }
      }
    });

  }

  return result.toJS();
}

export const addBookingToDay = (day, booking, bookings) => {
  let bookingIds = List(day.bookingIds || []);

  // get insertion index
  let index = -1;
  let bookingStart = booking.start;
  let bookingDuration = booking.end - booking.start;
  
  bookingIds.forEach((bookingId, bookingIdIndex) => {
    let comparisonBooking = bookings[bookingId];
    let comparisonBookingStart = comparisonBooking.start;
    let comparisonBookingDuration = comparisonBooking.end - comparisonBooking.start;
    
    if (bookingStart <= comparisonBookingStart &&
        bookingDuration >= comparisonBookingDuration) {
          index = bookingIdIndex;
    }
  });

  if (index == -1) {
    bookingIds = bookingIds.push(booking.id);
  }
  else {
    bookingIds = bookingIds.insert(index, booking.id);
  }
  let result = {...day, bookingIds: bookingIds.toJS() };

  return result;
}


