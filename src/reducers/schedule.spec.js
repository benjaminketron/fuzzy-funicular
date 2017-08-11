import { schedule, addBookingToBookings, addBookingToDays, addBookingToDay, createDaysIfNotExist } from './schedule'
import * as actionTypes from '../actions/indexActionTypes'

// sort of weird, but this library really helps keeps things dry
let using = require('jasmine-data-provider');

xdescribe('schedule reducer', () => {
  it('should handle initial state', () => {
    expect(
        schedule(undefined, {})
    ).toEqual({})
  })

  it('should handle ADD_BOOKING', () => {
    var now = new Date(2017, 8, 10, 3, 2, 1);

    var start = new Date(2017, 8, 9, 5, 0, 0);
    var end = new Date(2017, 8, 9, 5, 0, 0);

    expect(schedule({
      now: now,
      days: [],
      bookings: {}
    }, 
    { 
        type: actionTypes.ADD_BOOKING,
        booking: {
            eventName: 'event1',
            roomName: 'roomName1',
            start: start,
            end: end
        },
        id: 1 
    })).toEqual({
        now: now,
        days: [
          {
              date: new Date(2017, 9, 9),
              bookingIds: []
          },
          {
            date: new Date(2017, 8, 10),
            bookingIds: [1]
          }
        ],
        bookings: {
          1: {
            id: 1,
            eventName: 'event1',
            roomName: 'roomName1',
            start: start,
            end: end
          }
        }
      })
  })

  it('should handle INITIALIZE_BOOKINGS', () => {

  })

  it('should handle SEARCH_BOOKING', () => {
      
  })

  it('should handle SELECT_DAY', () => {
      
  })

  it('should handle SELECT_BOOKING_CLOSEST_TO', () => {
      
  })

})

xdescribe('addBookingToBookings function', () => {
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

xdescribe('addBookingToDays function', () => {
  using([
    {
      id: 1,
      days: [
        {
          id: 1,
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          id: 2,
          date: new Date(2017, 9, 10),
          bookingIds: [],
        },
        {
          id: 3,
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
          id: 1,
          date: new Date(2017, 9, 9),
          bookingIds: [],
        },
        {
          id: 2,
          date: new Date(2017, 9, 10),
          bookingIds: [1],
        },
        {
          id: 3,
          date: new Date(2017, 9, 11),
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

xdescribe('addBookingToDay ', () => {
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
    // {
    //   id: 6,
    //   days: [
    //     {
    //       date: new Date(2017, 9, 13),
    //       end: new Date(2017, 9, 14),
    //     }
    //   ],
    //   booking: {
    //     id: 1,
    //     start: new Date(2017, 9, 10, 12, 0),
    //     end: new Date(2017, 9, 15, 13, 0)
    //   },
    //   expected: [
    //     {
    //       date: new Date(2017, 9, 10),
    //       bookingIds: []
    //     },
    //     {
    //       date: new Date(2017, 9, 11),
    //       bookingIds: []
    //     },
    //     {
    //       date: new Date(2017, 9, 12),
    //       bookingIds: []
    //     },
    //     {
    //       date: new Date(2017, 9, 13),
    //       bookingIds: []
    //     },
    //     {
    //       date: new Date(2017, 9, 14),
    //       bookingIds: []
    //     },
    //     {
    //       date: new Date(2017, 9, 15),
    //       bookingIds: []
    //     }
    //   ]
    // }
  ], (data) => {
    fit('createDaysIfNotExist - ' + data.id, () => {
      let result = createDaysIfNotExist(data.days, data.booking);

      expect(result).toEqual(data.expected);

      // immutability test
      expect(result).not.toEqual(data.days);
    })
  })
})

// describe('todos reducer', () => {
//   it('should handle initial state', () => {
//     expect(
//       todos(undefined, {})
//     ).toEqual([])
//   })

//   it('should handle ADD_TODO', () => {
//     expect(
//       todos([], {
//         type: 'ADD_TODO',
//         text: 'Run the tests',
//         id: 0
//       })
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }
//     ])

//     expect(
//       todos([
//         {
//           text: 'Run the tests',
//           completed: false,
//           id: 0
//         }
//       ], {
//         type: 'ADD_TODO',
//         text: 'Use Redux',
//         id: 1
//       })
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 1
//       }
//     ])

//     expect(
//       todos([
//         {
//           text: 'Run the tests',
//           completed: false,
//           id: 0
//         }, {
//           text: 'Use Redux',
//           completed: false,
//           id: 1
//         }
//       ], {
//         type: 'ADD_TODO',
//         text: 'Fix the tests',
//         id: 2
//       })
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: false,
//         id: 0
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 1
//       }, {
//         text: 'Fix the tests',
//         completed: false,
//         id: 2
//       }
//     ])
//   })

//   it('should handle TOGGLE_TODO', () => {
//     expect(
//       todos([
//         {
//           text: 'Run the tests',
//           completed: false,
//           id: 1
//         }, {
//           text: 'Use Redux',
//           completed: false,
//           id: 0
//         }
//       ], {
//         type: 'TOGGLE_TODO',
//         id: 1
//       })
//     ).toEqual([
//       {
//         text: 'Run the tests',
//         completed: true,
//         id: 1
//       }, {
//         text: 'Use Redux',
//         completed: false,
//         id: 0
//       }
//     ])
//   })

// })
