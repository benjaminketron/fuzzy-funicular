import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

// in a real world app this would come from a service
import bookings from './bookings.json'

const store = createStore(reducer, { schedule: { current: new Date(), calendar: false }})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
