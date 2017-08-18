import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { List } from 'immutable'
import App from './components/App'
import reducer from './reducers'
import * as actions from './actions/index.js'
import scrollTo from 'scroll-to';

// in a real world app this would come from a service
import bookings from './bookings.json'

let now = new Date();
let today = now;

const store = createStore(reducer, { 
  schedule: { 
    today: today,
    current: now, 
    calendar: false, 
    search: false,
    days: List([{date: new Date(now.getFullYear(), now.getMonth(), now.getDate()), bookingIds: []}]),
  }
})

// load bookings
store.dispatch(actions.initializeBookings(bookings.bookings))

// navigate to today
store.dispatch(actions.setCalendarCurrent(now))

// subscribe to state changes so we can look for focused elements to scroll to
const scrollToElementInFocus = () => {
  // perhaps we could set focus class on focused elements
  // then here we can search for the first element with focus for a class name
  // determine the offset top
  // and scrollTo offsetTop + 50 in order to put it at the top of the app
  let state = store.getState();

  if (state.schedule.focusedElement) {
    
    scrollTo(0, state.schedule.focusedElement.offsetTop - 50, {
      duration: 500
    });

    store.dispatch(actions.unfocus())
  } 
}

store.subscribe(scrollToElementInFocus)

// update today every minute
setInterval(() => {
  store.dispatch(actions.setToday(new Date()))
}, 60000)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
