import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import * as actions from './actions/index.js'


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
    days: [{date: new Date(now.getFullYear(), now.getMonth(), now.getDate()), bookingIds: []}] 
  }
})

store.dispatch(actions.initializeBookings(bookings.bookings))

// subscribe to state changes so we can look for focused elements to scroll to
const scrollToElementInFocus = () => {
  // perhaps we could set focus class on focused elements
  // then here we can search for the first element with focus for a class name
  // determine the offset top
  // and scrollTo offsetTop + 50 in order to put it at the top of the app
  let state = store.getState();
  if (state.schedule.focusedElement) {
    console.log('focused', state);
    
    let scrollLeft = document.body.scrollLeft;
    let scrollTop = document.body.scrollTop;
    let offsetTop = state.schedule.focusedElement.offsetTop - 50;
    if (offsetTop != scrollTop) {
      window.scroll(scrollLeft, offsetTop);
    }
  } 
}

store.subscribe(scrollToElementInFocus)

// update today every minute
setInterval(() => {
  store.dispatch(actions.setToday(new Date))
}, 60000)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
