import schedule from './schedule'
import { addBookingToBookings, addBookingToDays, addBookingToDay, createDaysIfNotExist } from './schedule'
import * as actionTypes from '../actions/indexActionTypes'

// sort of weird, but this library really helps keeps things dry
let using = require('jasmine-data-provider');

describe('schedule reducer', () => {
  it('should handle initial state', () => {
    expect(
        schedule(undefined, {})
    ).toEqual({ 
      calendar: false,
      current: null
    })
  })

  using([
    {
      id: 1,
      state: {
      },
      action: {
        type: actionTypes.INITIALIZE_BOOKINGS,
        bookings:  [
          {
            id: 1,
            start: new Date(2017, 8, 14, 16, 0, 0),
            end: new Date(2017, 8, 14, 18, 0, 0)
          },
          {
            id: 2,
            start: new Date(2017, 8, 14, 12, 0, 0),
            end: new Date(2017, 8, 14, 13, 0, 0)
          }
        ]
      },
      expected: {
        bookings: {
          1: {
            id: 1,
            start: new Date(2017, 8, 14, 16, 0, 0),
            end: new Date(2017, 8, 14, 18, 0, 0)
          },
          2: {
            id: 2,
            start: new Date(2017, 8, 14, 12, 0, 0),
            end: new Date(2017, 8, 14, 13, 0, 0)
          }
        },
        days: [
          {
            date: new Date(2017, 8, 14, 0, 0, 0),
            bookingIds: [2, 1]
          }
        ],
      }
    },
    {
      id: 2,
      state: {
      },
      action: {
        type: actionTypes.INITIALIZE_BOOKINGS,
        bookings: [
          {
              "id": 0,
              "eventName": "Test Booking 01",
              "roomName": "Demo Room 01",
              "start": new Date("2016-11-10T13:00:00.000Z"),
              "end": new Date("2016-11-10T14:00:00.000Z")
          },
          {
              "id": 1,
              "eventName": "Test Booking 02",
              "roomName": "Demo Room 02",
              "start": new Date("2016-11-10T13:00:00.000Z"),
              "end": new Date("2016-11-10T14:00:00.000Z")
          },
          {
              "id": 2,
              "eventName": "Test Booking 03",
              "roomName": "Demo Room 03",
              "start": new Date("2016-11-14T13:00:00.000Z"),
              "end": new Date("2016-11-14T14:00:00.000Z")
          },
          {
              "id": 3,
              "eventName": "Test Booking 04",
              "roomName": "Demo Room 04",
              "start": new Date("2016-11-15T15:00:00.000Z"),
              "end": new Date("2016-11-15T16:00:00.000Z")
          },
          {
              "id": 4,
              "eventName": "Test Booking 05",
              "roomName": "Demo Room 05",
              "start": new Date("2016-11-15T15:00:00.000Z"),
              "end": new Date("2016-11-15T16:00:00.000Z")
          },
          {
              "id": 5,
              "eventName": "Thanksgiving",
              "roomName": "Conference Room 1",
              "start": new Date("2016-11-24T00:00:00.000Z"),
              "end": new Date("2016-11-24T23:59:59.999Z")
          }
        ]
      },
      expected: {
        bookings: {
          0: {
            "id": 0,
            "eventName": "Test Booking 01",
            "roomName": "Demo Room 01",
            "start": new Date("2016-11-10T13:00:00.000Z"),
            "end": new Date("2016-11-10T14:00:00.000Z")
          },
          1: {
            "id": 1,
            "eventName": "Test Booking 02",
            "roomName": "Demo Room 02",
            "start": new Date("2016-11-10T13:00:00.000Z"),
            "end": new Date("2016-11-10T14:00:00.000Z")
          },
          2: {
            "id": 2,
            "eventName": "Test Booking 03",
            "roomName": "Demo Room 03",
            "start": new Date("2016-11-14T13:00:00.000Z"),
            "end": new Date("2016-11-14T14:00:00.000Z")
          },
          3: {
            "id": 3,
            "eventName": "Test Booking 04",
            "roomName": "Demo Room 04",
            "start": new Date("2016-11-15T15:00:00.000Z"),
            "end": new Date("2016-11-15T16:00:00.000Z")
          },
          4: {
            "id": 4,
            "eventName": "Test Booking 05",
            "roomName": "Demo Room 05",
            "start": new Date("2016-11-15T15:00:00.000Z"),
            "end": new Date("2016-11-15T16:00:00.000Z")
          },
          5: {
            "id": 5,
            "eventName": "Thanksgiving",
            "roomName": "Conference Room 1",
            "start": new Date("2016-11-24T00:00:00.000Z"),
            "end": new Date("2016-11-24T23:59:59.999Z")
          }
        
        },
        days: [
          {
            date: new Date(2016, 10, 10, 0, 0, 0),
            bookingIds: [1, 0]
          },
          {
            date: new Date(2016, 10, 11, 0, 0, 0),
            end: new Date(2016, 10, 13, 0, 0, 0),
            bookingIds: []
          },
          {
            date: new Date(2016, 10, 14, 0, 0, 0),
            bookingIds: [2]
          },
          {
            date: new Date(2016, 10, 15, 0, 0, 0),
            bookingIds: [4, 3]
          },
          {
            date: new Date(2016, 10, 16, 0, 0, 0),
            end: new Date(2016, 10, 22, 0, 0, 0),
            bookingIds: []
          },
          {
            date: new Date(2016, 10, 23, 0, 0, 0),
            bookingIds: [5]
          }
        ]
      }
    },
    {
      id: 3,
      state: {
        days: [
          {
            date: new Date(2017, 8, 15, 0, 0, 0),
            bookingIds: []
          }
        ]
      },
      action: {
        type: actionTypes.INITIALIZE_BOOKINGS,
        bookings: [
          {
              "id": 0,
              "eventName": "Test Booking 01",
              "roomName": "Demo Room 01",
              "start": new Date("2016-11-10T13:00:00.000Z"),
              "end": new Date("2016-11-10T14:00:00.000Z")
          },
          {
              "id": 1,
              "eventName": "Test Booking 02",
              "roomName": "Demo Room 02",
              "start": new Date("2016-11-10T13:00:00.000Z"),
              "end": new Date("2016-11-10T14:00:00.000Z")
          },
          {
              "id": 2,
              "eventName": "Test Booking 03",
              "roomName": "Demo Room 03",
              "start": new Date("2016-11-14T13:00:00.000Z"),
              "end": new Date("2016-11-14T14:00:00.000Z")
          },
          {
              "id": 3,
              "eventName": "Test Booking 04",
              "roomName": "Demo Room 04",
              "start": new Date("2016-11-15T15:00:00.000Z"),
              "end": new Date("2016-11-15T16:00:00.000Z")
          },
          {
              "id": 4,
              "eventName": "Test Booking 05",
              "roomName": "Demo Room 05",
              "start": new Date("2016-11-15T15:00:00.000Z"),
              "end": new Date("2016-11-15T16:00:00.000Z")
          },
          {
              "id": 5,
              "eventName": "Thanksgiving",
              "roomName": "Conference Room 1",
              "start": new Date("2016-11-24T00:00:00.000Z"),
              "end": new Date("2016-11-24T23:59:59.999Z")
          }
        ]
      },
      expected: {
        bookings: {
          0: {
            "id": 0,
            "eventName": "Test Booking 01",
            "roomName": "Demo Room 01",
            "start": new Date("2016-11-10T13:00:00.000Z"),
            "end": new Date("2016-11-10T14:00:00.000Z")
          },
          1: {
            "id": 1,
            "eventName": "Test Booking 02",
            "roomName": "Demo Room 02",
            "start": new Date("2016-11-10T13:00:00.000Z"),
            "end": new Date("2016-11-10T14:00:00.000Z")
          },
          2: {
            "id": 2,
            "eventName": "Test Booking 03",
            "roomName": "Demo Room 03",
            "start": new Date("2016-11-14T13:00:00.000Z"),
            "end": new Date("2016-11-14T14:00:00.000Z")
          },
          3: {
            "id": 3,
            "eventName": "Test Booking 04",
            "roomName": "Demo Room 04",
            "start": new Date("2016-11-15T15:00:00.000Z"),
            "end": new Date("2016-11-15T16:00:00.000Z")
          },
          4: {
            "id": 4,
            "eventName": "Test Booking 05",
            "roomName": "Demo Room 05",
            "start": new Date("2016-11-15T15:00:00.000Z"),
            "end": new Date("2016-11-15T16:00:00.000Z")
          },
          5: {
            "id": 5,
            "eventName": "Thanksgiving",
            "roomName": "Conference Room 1",
            "start": new Date("2016-11-24T00:00:00.000Z"),
            "end": new Date("2016-11-24T23:59:59.999Z")
          }
        
        },
        days: [
          {
            date: new Date(2016, 10, 10, 0, 0, 0),
            bookingIds: [1, 0]
          },
          {
            date: new Date(2016, 10, 11, 0, 0, 0),
            end: new Date(2016, 10, 13, 0, 0, 0),
            bookingIds: []
          },
          {
            date: new Date(2016, 10, 14, 0, 0, 0),
            bookingIds: [2]
          },
          {
            date: new Date(2016, 10, 15, 0, 0, 0),
            bookingIds: [4, 3]
          },
          { 
            date: new Date(2016, 10, 16, 0, 0, 0),
            end: new Date(2016, 10, 22, 0, 0, 0),
            bookingIds: []
          },
          {
            date: new Date(2016, 10, 23, 0, 0, 0),
            bookingIds: [5]
          },
          {
            date: new Date(2016, 10, 24, 0, 0, 0),
            bookingIds: [5]
          },
          { 
            date: new Date(2016, 10, 25, 0, 0, 0),
            end: new Date(2017, 8, 14, 0, 0, 0),
            bookingIds: []
          },
          {
            date: new Date(2017, 8, 15, 0, 0, 0),
            bookingIds: []
          }
        ],
      }
    }
  ], (data) => {
    it('should handle INITIALIZE_BOOKINGS action - ' + data.id, () => {
      
        let result = schedule(data.state, data.action);
    
        expect(result).toEqual(data.expected);
    
        // immutability test
        expect(result).not.toEqual(data.state);
    
      })
  })

  using([
    {
      id: 1,
      state: {

      },
      action: {
        type: actionTypes.FOCUS,
        element: {},
        day: {
          focus: true
        } 
      },
      expected: {
        focusedElement: {}
      },
      testImmutability: true
    },
    {
      id: 2,
      state: {

      },
      action: {
        type: actionTypes.FOCUS,
        element: {},
        day: {
          focus: false
        } 
      },
      expected: {
        
      },
      testImmutability: false
    }
  ], (data) => {
    it('should handle FOCUS - ' + data.id, () => {
      let result = schedule(data.state, data.action);

      expect(result).toEqual(data.expected);

       // immutability test
       if (data.testImmutability) {
        expect(result).not.toEqual(data.state);        
       }
    })
  })

  using([
    {
      id: 1,
      state: {
        days: [],
        bookings: {}
      },
      action: {
        type: actionTypes.ADD_BOOKING,
        booking: {
            id: 1,
            eventName: 'event1',
            roomName: 'roomName1',
            start: new Date(2017, 8, 9, 5, 0, 0),
            end: new Date(2017, 8, 9, 7, 0, 0)
        },
        id: 1 
      },
      expected: {
        add: false,
        days: [
          {
            date: new Date(2017, 8, 9),
            bookingIds: [1]
          }
        ],
        bookings: {
          1: {
            id: 1,
            eventName: 'event1',
            roomName: 'roomName1',
            start: new Date(2017, 8, 9, 5, 0, 0),
            end: new Date(2017, 8, 9, 7, 0, 0)
          }
        }
      }
    },
    {
      id: 2,
      state: {
        days: [],
        bookings: {}
      },
      action: {
        type: actionTypes.ADD_BOOKING,
        booking: {
            id: 1,
            eventName: 'event1',
            roomName: 'roomName1',
            start: new Date(2017, 8, 9, 5, 0, 0),
            end: new Date(2017, 8, 9, 7, 0, 0)
        },
        id: 1 
      },
      expected: {
        add: false,
        days: [
          {
            date: new Date(2017, 8, 9),
            bookingIds: [1]
          }
        ],
        bookings: {
          1: {
            id: 1,
            eventName: 'event1',
            roomName: 'roomName1',
            start: new Date(2017, 8, 9, 5, 0, 0),
            end: new Date(2017, 8, 9, 7, 0, 0)
          }
        }
      }
    }
  ], (data) => {
    it('should handle ADD_BOOKING - ' + data.id, () => {  
      let result = schedule(data.state, data.action);
      expect(result).toEqual(data.expected);
  
      // immutability test
      expect(data.state).not.toEqual(result);
    })
  })

  using([
    {
      id: 1,
      state: {
        days: [
          {
            date: new Date(2017, 6, 4),
            bookingIds: [2, 3, 1]
          }
        ],
        bookings: {
          1: {
            id: 1,
            eventName: 'Happy Holiday',
            roomName: 'The Park',
            start: new Date(2017, 6, 4, 21, 0, 0),
            end: new Date(2017, 6, 4, 23, 0, 0)
          },
          2: {
            id: 2,
            eventName: 'Oboe Tuning',
            roomName: 'Musical Services',
            start: new Date(2017, 6, 4, 12, 0, 0),
            end: new Date(2017, 6, 4, 13, 0, 0)
          },
          3: {
            id: 3,
            eventName: 'Dinner at Jay\'s',
            roomName: 'Jas\'s Bistro',
            start: new Date(2017, 6, 4, 18, 0, 0),
            end: new Date(2017, 6, 4, 19, 0, 0)
          }
        }
      },
      action: {
        type: actionTypes.SEARCH_BOOKING,
        searchText: 'Bistro'
      },
      expected: {
        days: [
          {
            date: new Date(2017, 6, 4),
            bookingIds: [2, 3, 1]
          }
        ],
        bookings: {
          1: {
            id: 1,
            eventName: 'Happy Holiday',
            roomName: 'The Park',
            start: new Date(2017, 6, 4, 21, 0, 0),
            end: new Date(2017, 6, 4, 23, 0, 0),
            hidden: true
          },
          2: {
            id: 2,
            eventName: 'Oboe Tuning',
            roomName: 'Musical Services',
            start: new Date(2017, 6, 4, 12, 0, 0),
            end: new Date(2017, 6, 4, 13, 0, 0),
            hidden: true
          },
          3: {
            id: 3,
            eventName: 'Dinner at Jay\'s',
            roomName: 'Jas\'s Bistro',
            start: new Date(2017, 6, 4, 18, 0, 0),
            end: new Date(2017, 6, 4, 19, 0, 0),
            hidden: false
          }
        }
      }
    },
    {
      id: 2,
      state: {
        days: [
          {
            date: new Date(2017, 6, 4),
            bookingIds: [2, 3, 1]
          }
        ],
        bookings: {
          1: {
            id: 1,
            eventName: 'Happy Holiday',
            roomName: 'The Park',
            start: new Date(2017, 6, 4, 21, 0, 0),
            end: new Date(2017, 6, 4, 23, 0, 0),
          },
          2: {
            id: 2,
            eventName: 'Oboe Tuning',
            roomName: 'Musical Services',
            start: new Date(2017, 6, 4, 12, 0, 0),
            end: new Date(2017, 6, 4, 13, 0, 0),
          },
          3: {
            id: 3,
            eventName: 'Dinner at Jay\'s',
            roomName: 'Jas\'s Bistro',
            start: new Date(2017, 6, 4, 18, 0, 0),
            end: new Date(2017, 6, 4, 19, 0, 0),
          }
        }
      },
      action: {
        type: actionTypes.SEARCH_BOOKING,
        searchText: 'Tun'
      },
      expected: {
        days: [
          {
            date: new Date(2017, 6, 4),
            bookingIds: [2, 3, 1]
          }
        ],
        bookings: {
          1: {
            id: 1,
            eventName: 'Happy Holiday',
            roomName: 'The Park',
            start: new Date(2017, 6, 4, 21, 0, 0),
            end: new Date(2017, 6, 4, 23, 0, 0),
            hidden: true
          },
          2: {
            id: 2,
            eventName: 'Oboe Tuning',
            roomName: 'Musical Services',
            start: new Date(2017, 6, 4, 12, 0, 0),
            end: new Date(2017, 6, 4, 13, 0, 0),
            hidden: false
          },
          3: {
            id: 3,
            eventName: 'Dinner at Jay\'s',
            roomName: 'Jas\'s Bistro',
            start: new Date(2017, 6, 4, 18, 0, 0),
            end: new Date(2017, 6, 4, 19, 0, 0),
            hidden: true
          }
        }
      }
    }
  ], (data) => {
    it('should handle SEARCH_BOOKING - ' + data.id, () => {
      let result = schedule(data.state, data.action);
      expect(result).toEqual(data.expected);

      // immutability test
      expect(data.state).not.toEqual(result);
    })
  })

  using([
    {
      id: 1,
      state: {
        days: [
          {
            date: new Date(2017, 7, 11),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 12),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 13),
            bookingIds: []
          }
        ]
      },
      action: {
        type: actionTypes.SELECT_DAY,
        date: new Date(2017, 7, 12)
      },
      expected: {
        days: [
          {
            date: new Date(2017, 7, 11),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 12),
            bookingIds: [],
            focus: true
          },
          {
            date: new Date(2017, 7, 13),
            bookingIds: []
          }
        ]
      }
    },
    {
      id: 2,
      state: {
        days: [
          {
            date: new Date(2017, 7, 11),
            bookingIds: [],
            focus: true
          },
          {
            date: new Date(2017, 7, 12),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 13),
            bookingIds: []
          }
        ]
      },
      action: {
        type: actionTypes.SELECT_DAY,
        date: new Date(2017, 7, 13)
      },
      expected: {
        days: [
          {
            date: new Date(2017, 7, 11),
            bookingIds: [],
            focus: false
          },
          {
            date: new Date(2017, 7, 12),
            bookingIds: [],
          },
          {
            date: new Date(2017, 7, 13),
            bookingIds: [],
            focus: true
          }
        ]
      }
    },
    {
      id: 3,
      state: {
        days: [
          {
            date: new Date(2017, 7, 11),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 12),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 13),
            end: new Date(2017, 7, 15),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 16),
            bookingIds: []
          }
        ]
      },
      action: {
        type: actionTypes.SELECT_DAY,
        date: new Date(2017, 7, 14)
      },
      expected: {
        days: [
          {
            date: new Date(2017, 7, 11),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 12),
            bookingIds: []
          },
          {
            date: new Date(2017, 7, 13),
            end: new Date(2017, 7, 15),
            bookingIds: [],
            focus: true
          },
          {
            date: new Date(2017, 7, 16),
            bookingIds: []
          }
        ]
      }
    }
  ], (data) => {
    it('should handle SELECT_DAY - ' + data.id, () => {
      let result = schedule(data.state, data.action);

      expect(result).toEqual(data.expected);

      // immutability test
      expect(result).not.toEqual(data.state);
    })
  })
  
  using([
    {
      id: 1,
      state: {
        days: [
          {
            date: new Date(2017, 5, 6),
            bookingIds: [2]
          },
          {
            date: new Date(2017, 6, 6),
            bookingIds: [3]
          },
          {
            date: new Date(2017, 7, 4),
            bookingIds: [1]
          },
          {
            date: new Date(2017, 8, 6),
            bookingIds: [5]
          }
        ]
      },
      action: {
        type: actionTypes.SELECT_DAY_BOOKING_CLOSEST_TO,
        date: new Date(2017, 7, 4)
      },
      expected: {
        days: [
          {
            date: new Date(2017, 5, 6),
            bookingIds: [2]
          },
          {
            date: new Date(2017, 6, 6),
            bookingIds: [3]
          },
          {
            date: new Date(2017, 7, 4),
            bookingIds: [1],
            focus: true
          },
          {
            date: new Date(2017, 8, 6),
            bookingIds: [5]
          }
        ]
      },
      immutableCheck: true
    },
    {
      id: 2,
      state: {
        days: [
          {
            date: new Date(2017, 5, 6),
            bookingIds: [2],
            focus: true
          },
          {
            date: new Date(2017, 6, 6),
            bookingIds: [3]
          },
          {
            date: new Date(2017, 7, 4),
            bookingIds: [1]
          },
          {
            date: new Date(2017, 8, 6),
            bookingIds: [5]
          }
        ]
      },
      action: {
        type: actionTypes.SELECT_DAY_BOOKING_CLOSEST_TO,
        date: new Date(2017, 7, 1)
      },
      expected: {
        days: [
          {
            date: new Date(2017, 5, 6),
            bookingIds: [2],
            focus: false
          },
          {
            date: new Date(2017, 6, 6),
            bookingIds: [3]
          },
          {
            date: new Date(2017, 7, 4),
            bookingIds: [1],
            focus: true
          },
          {
            date: new Date(2017, 8, 6),
            bookingIds: [5]
          }
        ]
      },
      immutableCheck: true
    },
    {
      id: 3,
      state: {
        days: [
          {
            date: new Date(2017, 5, 6),
            bookingIds: [2]
          },
          {
            date: new Date(2017, 6, 6),
            bookingIds: [3]
          },
          {
            date: new Date(2017, 7, 4),
            bookingIds: [1],
            focus: true
          },
          {
            date: new Date(2017, 8, 6),
            bookingIds: [5],
          }
        ]
      },
      action: {
        type: actionTypes.SELECT_DAY_BOOKING_CLOSEST_TO,
        date: new Date(2017, 8, 9)
      },
      expected: {
        days: [
          {
            date: new Date(2017, 5, 6),
            bookingIds: [2]
          },
          {
            date: new Date(2017, 6, 6),
            bookingIds: [3]
          },
          {
            date: new Date(2017, 7, 4),
            bookingIds: [1],
            focus: true
          },
          {
            date: new Date(2017, 8, 6),
            bookingIds: [5]
          }
        ]
      },
      immutableCheck: false
    }
  ], (data) => {
    it('should handle SELECT_DAY_BOOKING_CLOSEST_TO - ' + data.id, () => {
      let result = schedule(data.state, data.action);

      expect(result).toEqual(data.expected);

      // immutability check
      if (data.immutableCheck) {
        expect(data.state).not.toEqual(result);
      }
    })
  })

  using([
    {
      id: 1,
      state: {
        calendar: false
      },
      action: {
        type: actionTypes.TOGGLE_CALENDAR
      },
      expected: {
        calendar: true
      }
    },
    {
      id: 2,
      state: {
        calendar: true
      },
      action: {
        type: actionTypes.TOGGLE_CALENDAR
      },
      expected: {
        calendar: false
      }
    }
  ], (data) => {
    it('should handle TOGGLE_CALENDAR - ' + data.id, () => {
      let result = schedule(data.state, data.action);
      
      expect(result).toEqual(data.expected);

      // immutability check
      if (data.immutableCheck) {
        expect(data.state).not.toEqual(result);
      }
    })
  })

  it('should handle SET_CALENDAR_CURRENT', () => {
    let state = { current: null }
    let date = new Date();
    let action = { type: actionTypes.SET_CALENDAR_CURRENT, current: date }
    let result = schedule(state, action);
    expect(result).toEqual({
      current: date,
    })

    // immutability check
    expect(state).not.toEqual(result);
  })

  it('should handle SET_TODAY', () => {
    let state = { today: null }
    let today = new Date();
    let action = {type: actionTypes.SET_TODAY, today: today }
    let result = schedule(state, action);
    expect(result).toEqual({
      today: today
    })

    // immutability check
    expect(state).not.toEqual(result);
  })

  using([
    {
      id: 1,
      state: {
        search: false
      },
      action: {
        type: actionTypes.TOGGLE_SEARCH
      },
      expected: {
        search: true,
        calendar: false
      }
    },
    {
      id: 2,
      state: {
        search: true
      },
      action: {
        type: actionTypes.TOGGLE_SEARCH
      },
      expected: {
        search: false,
        calendar: false,
        searchText: ''
      }
    }
  ], (data) => {
    it('should handle TOGGLE_SEARCH - ' + data.id, () => {
      let result = schedule(data.state, data.action);
      
      expect(result).toEqual(data.expected);

      // immutability check
      if (data.immutableCheck) {
        expect(data.state).not.toEqual(result);
      }
    })
  })
  
  using([
    {
      id: 1,
      state: {
        add: false
      },
      action: {
        type: actionTypes.TOGGLE_ADD
      },
      expected: {
        add: true
      }
    },
    {
      id: 2,
      state: {
        add: true
      },
      action: {
        type: actionTypes.TOGGLE_ADD
      },
      expected: {
        add: false
      }
    }
  ], (data) => {
    it('should handle TOGGLE_ADD - ' + data.id, () => {
      let result = schedule(data.state, data.action);
      
      expect(result).toEqual(data.expected);

      // immutability check
      if (data.immutableCheck) {
        expect(data.state).not.toEqual(result);
      }
    })
  })
})

describe('addBookingToBookings function', () => {
  using([
    { 
      id: 1,
      bookings: {},
      action: { type: actionTypes.ADD_BOOKING, id: 1, booking: { eventName: 'event1' }},
      expected: {
        1: {
          id: 1,
          eventName: 'event1'
        }
      }
    },
    {
      id: 2,
      bookings: {
        1: {
          id: 1,
          eventName: 'event1'
        }
      },
      action: { type: actionTypes.ADD_BOOKING, id: 1, booking: {eventName: 'modifiedEvent1'}},
      expected: {
        1: {
          id: 1,
          eventName: 'modifiedEvent1'
        }
      }
    },
    {
      id: 3,
      bookings: {
        1: {
          id: 1,
          eventName: 'event1'
        }
      },
      action: { type: actionTypes.ADD_BOOKING, id: 2, booking: {eventName: 'event2'}},
      expected: {
        1: {
          id: 1,
          eventName: 'event1'
        },
        2: {
          id: 2,
          eventName: 'event2'
        }
      }
    }], (data) => {
    it('should store new booking in an array using id as key - ' + data.id, () => {
        let result = addBookingToBookings(data.bookings, data.action)
        expect(result).toEqual(data.expected)

        // immutability test
        expect(data.bookings).not.toEqual(result);
    })
  })
});

describe('addBookingToDays function', () => {
  using([
    {
      id: 1,
      days: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ],
      bookings: {
        1: {
          id: 1,
          start: new Date(2017, 9, 10, 18, 0),
          end: new Date(2017, 9, 10, 20, 0)
        }
      },
      action: {
        type: actionTypes.ADD_BOOKING,
        id: 1,
        booking: {
          id: 1,
          start: new Date(2017, 9, 10, 18, 0),
          end: new Date(2017, 9, 10, 20, 0)
        }
      },
      expected: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [1],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ]
    },
    {
      id: 2,
      days: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [1, 2],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ],
      bookings: {
        1: {
          id: 1,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 20, 0)
        },
        2: {
          id: 2,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 19, 0)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 21, 0)
        }
      },
      action: {
        type: actionTypes.ADD_BOOKING,
        id: 3,
        booking: {
          id: 3,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 21, 0)
        }
      },
      expected: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [3,1,2],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ]
    },
    {
      id: 3,
      days: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [1, 2],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ],
      bookings: {
        1: {
          id: 1,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 20, 0)
        },
        2: {
          id: 2,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 19, 0)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 9, 16, 0),
          end: new Date(2017, 9, 11, 21, 0)
        }
      },
      action: {
        type: actionTypes.ADD_BOOKING,
        id: 3,
        booking: {
          id: 3,
          start: new Date(2017, 9, 9, 16, 0),
          end: new Date(2017, 9, 11, 21, 0)
        }
      },
      expected: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: [3],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [3,1,2],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [3],
        }
      ]
    },
    {
      id: 4,
      days: [
        {
          date: new Date(2017, 9, 8),
          end: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [1, 2],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ],
      bookings: {
        1: {
          id: 1,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 20, 0)
        },
        2: {
          id: 2,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 19, 0)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 9, 16, 0),
          end: new Date(2017, 9, 11, 21, 0)
        }
      },
      action: {
        type: actionTypes.ADD_BOOKING,
        id: 3,
        booking: {
          id: 3,
          start: new Date(2017, 9, 9, 16, 0),
          end: new Date(2017, 9, 11, 21, 0)
        }
      },
      expected: [
        {
          date: new Date(2017, 9, 8),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 9),
          bookingIds: [3],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [3,1,2],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [3],
        }
      ]
    },
    {
      id: 5,
      days: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [1, 2],
        },
        {
          date: new Date(2017, 9, 11),
          end: new Date(2017, 9, 20),
          bookingIds: [],
        }
      ],
      bookings: {
        1: {
          id: 1,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 20, 0)
        },
        2: {
          id: 2,
          start: new Date(2017, 9, 10, 16, 0),
          end: new Date(2017, 9, 10, 19, 0)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 8, 16, 0),
          end: new Date(2017, 9, 12, 21, 0)
        }
      },
      action: {
        type: actionTypes.ADD_BOOKING,
        id: 3,
        booking: {
          id: 3,
          start: new Date(2017, 9, 8, 16, 0),
          end: new Date(2017, 9, 12, 21, 0)
        }
      },
      expected: [
        {
          date: new Date(2017, 9, 8),
          bookingIds: [3]
        },
        {
          date: new Date(2017, 9, 9),
          bookingIds: [3],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [3,1,2],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [3],
        },
        {
          date: new Date(2017, 9, 12),
          bookingIds: [3],
        },
        {
          date: new Date(2017, 9, 13),
          end: new Date(2017, 9, 20),
          bookingIds: [],
        }
      ]
    }
  ], (data) => {
    it('should insert booking id into the correct day - ' + data.id, () => {
      let result = addBookingToDays(data.days, data.bookings, data.action);
      expect(result).toEqual(data.expected);

      // immutability test
      expect(result).not.toEqual(data.days);
    })
  })
})

describe('addBookingToDay ', () => {
  using([
    {
      id: 1,
      day: {
        id: 1
      },    
      booking: {
        id: 2,
        start: new Date(2017, 9, 11, 11, 0),
        end: new Date(2017, 9, 11, 12)
      },
      bookings: {
        2: {
          id: 2,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 12)
        }
      },
      expected: {
        id: 1,
        bookingIds: [2]
      }
    },
    {
      id: 2,
      day: {
        id: 1,
        bookingIds: []
      },
      booking: {
        id: 2,
        start: new Date(2017, 9, 11, 11, 0),
        end: new Date(2017, 9, 11, 12, 0)
      },
      bookings: {
        2: {
          id: 2,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 12, 0)
        }
      },
      expected: {
        id: 1,
        bookingIds: [2]
      }
    },
    {
      id: 3,
      day: {
        id: 1,
        bookingIds: [2]
      },
      booking: {
        id: 3,
        start: new Date(2017, 9, 11, 11, 0),
        end: new Date(2017, 9, 11, 13, 9)
      },
      bookings: {
        2: {
          id: 2,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 12, 0)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 13, 9)
        }
      },
      expected: {
        id: 1,
        bookingIds: [3, 2]
      }
    },
    {
      id: 4,
      day: {
        id: 1,
        bookingIds: [2]
      },
      booking: {
        id: 3,
        start: new Date(2017, 9, 11, 11, 0),
        end: new Date(2017, 9, 11, 12, 9)
      },
      bookings: {
        2: {
          id: 2,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 13)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 12, 9)
        }
      },
      expected: {
        id: 1,
        bookingIds: [2, 3]
      }
    },
    {
      id: 5,
      day: {
        id: 1,
        bookingIds: [2]
      },
      booking: {
        id: 3,
        start: new Date(2017, 9, 11, 9, 0),
        end: new Date(2017, 9, 11, 14, 9, 0)
      },
      bookings: {
        2: {
          id: 2,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 12, 0)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 11, 9, 0),
          end: new Date(2017, 9, 11, 14, 0)
        }
      },
      expected: {
        id: 1,
        bookingIds: [3, 2]
      }
    },
    {
      id: 6,
      day: {
        id: 1,
        bookingIds: [3, 2]
      },
      booking: {
        id: 4,
        start: new Date(2017, 9, 11, 18, 0),
        end: new Date(2017, 9, 11, 20, 0)
      },
      bookings: {
        2: {
          id: 2,
          start: new Date(2017, 9, 11, 11, 0),
          end: new Date(2017, 9, 11, 12)
        },
        3: {
          id: 3,
          start: new Date(2017, 9, 11, 9, 0),
          end: new Date(2017, 9, 11, 14, 0)
        },
        4: {
          id: 4,
          start: new Date(2017, 9, 11, 18, 0),
          end: new Date(2017, 9, 11, 20, 0)
        }
      },
      expected: {
        id: 1,
        bookingIds: [3, 2, 4]
      }
    }
  ], (data) => {
    it('adds booking id to day in chronological asending, duration descending order - ' + data.id, () => {
      let result = addBookingToDay(data.day, data.booking, data.bookings);

      expect(result).toEqual(data.expected);

      // immutability test
      expect(result).not.toBe(data.day);

    })
  })
})

describe('createDaysIfNotExist', () => {
  using([
    {
      id: 1,
      days: [],
      booking: {
        id: 1,
        start: new Date(2017, 9, 11, 12, 0),
        end: new Date(2017, 9, 11, 13, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 11),
          bookingIds: []
        }
      ]
    },
    {
      id: 2,
      days: [],
      booking: {
        id: 1,
        start: new Date(2017, 9, 11, 12, 0),
        end: new Date(2017, 9, 12, 13, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 11),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 12),
          bookingIds: []
        }
      ]
    },
    {
      id: 3,
      days: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: []
        }
      ],
      booking: {
        id: 1,
        start: new Date(2017, 9, 11, 12, 0),
        end: new Date(2017, 9, 11, 13, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 9),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 10),
          end: new Date(2017, 9, 10),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: []
        }
      ]
    },
    {
      id: 4,
      days: [
        {
          date: new Date(2017, 9, 13),
          bookingIds: []
        }
      ],
      booking: {
        id: 1,
        start: new Date(2017, 9, 11, 12, 0),
        end: new Date(2017, 9, 11, 13, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 11),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 12),
          end: new Date(2017, 9, 12),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 13),
          bookingIds: []
        }
      ]
    },
    {
      id: 5,
      days: [
        {
          date: new Date(2017, 9, 13),
          bookingIds: []
        }
      ],
      booking: {
        id: 1,
        start: new Date(2017, 9, 10, 12, 0),
        end: new Date(2017, 9, 15, 13, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 10),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 12),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 13),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 14),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 15),
          bookingIds: []
        }
      ]
    },
    {
      id: 6,
      days: [
        {
          date: new Date(2017, 9, 13),
          end: new Date(2017, 9, 14),
        }
      ],
      booking: {
        id: 1,
        start: new Date(2017, 9, 10, 12, 0),
        end: new Date(2017, 9, 15, 13, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 10),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 12),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 13),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 14),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 15),
          bookingIds: []
        }
      ]
    },
    {
      id: 7,
      days: [
        {
          date: new Date(2017, 9, 13),
          end: new Date(2017, 9, 16),
        }
      ],
      booking: {
        id: 1,
        start: new Date(2017, 9, 10, 11, 0),
        end: new Date(2017, 9, 14, 14, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 10),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 12),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 13),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 14),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 15),
          end: new Date(2017, 9, 16),
          bookingIds: []
        }
      ]
    },
    {
      id: 8,
      days: [
        {
          date: new Date(2017, 9, 12),
          end: new Date(2017, 9, 16),
        }
      ],
      booking: {
        id: 1,
        start: new Date(2017, 9, 14, 14, 0),
        end: new Date(2017, 9, 17, 17, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 12),
          end: new Date(2017, 9, 13),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 14),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 15),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 16),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 17),
          bookingIds: []
        }
      ]
    },
    {
      id: 9,
      days: [
        {
          date: new Date(2017, 9, 8),
          end: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ],
      booking: {
        id: 3,
        start: new Date(2017, 9, 9, 16, 0),
        end: new Date(2017, 9, 11, 21, 0)
      },
      expected: [
        {
          date: new Date(2017, 9, 8),
          bookingIds: []
        },
        {
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 10),
          bookingIds: [],
        },
        {
          date: new Date(2017, 9, 11),
          bookingIds: [],
        }
      ]
    }
  ], (data) => {
    it('createDaysIfNotExist - ' + data.id, () => {
      let result = createDaysIfNotExist(data.days, data.booking);

      expect(result).toEqual(data.expected);

      // immutability test
      expect(result).not.toEqual(data.days);
    })
  })

  it ('createDaysIfNotExist tolerates bookings on same day when starting with no days', () => {
    let days = [];
    let booking1 = {
      id: 1,
      start: new Date(2017, 8, 14, 18, 0, 0),
      end: new Date(2017, 8, 14, 20, 0, 0)
    }
    let booking2 = {
      id: 2,
      start: new Date(2017, 8, 14, 12, 0, 0),
      end: new Date(2017, 8, 14, 13, 0, 0)
    }
    let result1 = createDaysIfNotExist(days, booking1);
    expect(result1).toEqual([
      {
        date: new Date(2017, 8, 14, 0, 0, 0),
        bookingIds: []
      }
    ])

    let result2 = createDaysIfNotExist(result1, booking2);
    expect(result2).toEqual([
      {
        date: new Date(2017, 8, 14, 0, 0, 0),
        bookingIds: []
      }
    ])
  })
})