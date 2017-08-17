import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import * as actionTypes from './actions/indexActionTypes.js'

// in a real world app this would come from a service
import bookings from './bookings.json'

let now = new Date();
let today = now;

// convert dates from strings
// TODO replace with more concise / reusable method
for (let b = 0; b < bookings.bookings.length; b++) {
  let booking = bookings.bookings[b];
  if (booking.start) 
    booking.start = new Date(booking.start);

  if (booking.end) 
    booking.end = new Date(booking.end);
}

const store = createStore(reducer, { 
  schedule: { 
    today: today,
    current: now, 
    calendar: false, 
    search: false,
    bookingsList: bookings.bookings, 
    days: [{date: new Date(now.getFullYear(), now.getMonth(), now.getDate()), bookingIds: []}] 
  }
})

// update today periodically
setInterval(() => {
  store.dispatch({
    type: actionTypes.SET_TODAY,
    today: new Date()
  })
}, 1000)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
