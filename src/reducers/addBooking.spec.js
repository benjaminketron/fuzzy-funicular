import addBooking from './addBooking';
import * as actionTypes from '../actions/indexActionTypes';

// sort of weird, but this library really helps keeps things dry
let using = require('jasmine-data-provider');

describe('addBooking reducer', () => {

    it('should handle initial state', () => {
        let state = {

        };
        let action = {
            
        }

        let result = addBooking(state, action);

        expect(result).toEqual({});

        
    })

    using([
        {
            id: 1,
            state: {
                stuff: true
            },
            action: {
                type: actionTypes.TOGGLE_ADD
            },
            expected: {
                eventName: '',
                roomName: ''
            }
        },
        {
            id: 2,
            state: {
            },
            action: {
                type: actionTypes.SET_ADD_EVENT_NAME,
                eventName: 'event'
            },
            expected: {
                eventName: 'event'
            }
        },
        {
            id: 3,
            state: {
            },
            action: {
                type: actionTypes.SET_ADD_ROOM_NAME,
                roomName: 'room'
            },
            expected: {
                roomName: 'room'
            }
        },
        {
            id: 4,
            state: {
            },
            action: {
                type: actionTypes.SET_ADD_START_DATE,
                startDate: new Date(2017, 8, 17)
            },
            expected: {
                startDate: new Date(2017, 8, 17),
                start:  new Date(2017, 8, 17)
            }
        },
        {
            id: 5,
            state: {
            },
            action: {
                type: actionTypes.SET_ADD_START_TIME,
                startTime: new Date(2017, 8, 17, 12, 13, 0)
            },
            expected: {
                startTime: new Date(2017, 8, 17, 12, 13, 0),
                start: null
            }
        },
        {
            id: 6,
            state: {
            },
            action: {
                type: actionTypes.SET_ADD_END_DATE,
                endDate: new Date(2017, 8, 18)
            },
            expected: {
                endDate: new Date(2017, 8, 18),
                end: new Date(2017, 8, 18)
            }
        },
        {
            id: 7,
            state: {
            },
            action: {
                type: actionTypes.SET_ADD_END_TIME,
                endTime: new Date(2017, 8, 18, 20, 10, 0)
            },
            expected: {
                endTime: new Date(2017, 8, 18, 20, 10, 0),
                end: null
            }
        },
        {
            id: 8,
            state: {
                endDate: new Date(2017, 8, 19)
            },
            action: {
                type: actionTypes.SET_ADD_END_TIME,
                endTime: new Date(2017, 8, 18, 20, 10, 0)
            },
            expected: {
                endDate: new Date(2017, 8, 19),                
                endTime: new Date(2017, 8, 18, 20, 10, 0),
                end: new Date(2017, 8, 19, 20, 10, 0)
            }
        },
        {
            id: 9,
            state: {
                startDate: new Date(2017, 8, 19)
            },
            action: {
                type: actionTypes.SET_ADD_START_TIME,
                startTime: new Date(2017, 8, 18, 20, 10, 0)
            },
            expected: {
                startDate: new Date(2017, 8, 19),                
                startTime: new Date(2017, 8, 18, 20, 10, 0),
                start: new Date(2017, 8, 19, 20, 10, 0)
            }
        }
    ], (data) => {
        it('should handle various actions - ' + data.id, () => {
            let result = addBooking(data.state, data.action);
            
            expect(result).toEqual(data.expected);
    
            // immutability test
            expect(data.state).not.toEqual(result);
        })
    })

    let errorMessage = 'This field is required.';

    using([
        {
            id: 1,
            state: {
                roomName: 'room',
                startDate: 'startDate',
                startTime: 'starttime',
                endDate: 'endDate',
                endTime: 'endTime'
            },
            action: {
                type: actionTypes.ADD_BOOKING
            },
            expected: {
                eventNameError: errorMessage,
                roomName: 'room',
                startDate: 'startDate',
                startDateError: '',
                startTime: 'starttime',
                startTimeError: '',
                endDate: 'endDate',
                endDateError: '',
                endTime: 'endTime',
                endTimeError: ''
            }
        },
        {
            id: 2,
            state: {
                eventName: 'event',
                roomName: 'room',
                startTime: 'starttime',
                endDate: 'endDate',
                endTime: 'endTime'
            },
            action: {
                type: actionTypes.ADD_BOOKING
            },
            expected: {
                eventName: 'event',
                eventNameError: '',
                roomName: 'room',
                startDateError: errorMessage,
                startTime: 'starttime',
                startTimeError: '',
                endDate: 'endDate',
                endDateError: '',
                endTime: 'endTime',
                endTimeError: ''
            }
        },
        {
            id: 3,
            state: {
                eventName: 'event',
                roomName: 'room',
                startDate: 'startDate',
                endDate: 'endDate',
                endTime: 'endTime'
            },
            action: {
                type: actionTypes.ADD_BOOKING
            },
            expected: {
                eventName: 'event',
                eventNameError: '',
                roomName: 'room',
                startDate: 'startDate',
                startDateError: '',
                startTimeError: errorMessage,
                endDate: 'endDate',
                endDateError: '',
                endTime: 'endTime',
                endTimeError: ''
            }
        },
        {
            id: 4,
            state: {
                eventName: 'event',
                roomName: 'room',
                startDate: 'startDate',
                startTime: 'startTime',
                endTime: 'endTime'
            },
            action: {
                type: actionTypes.ADD_BOOKING
            },
            expected: {
                eventName: 'event',
                eventNameError: '',
                roomName: 'room',
                startDate: 'startDate',
                startDateError: '',
                startTime: 'startTime',
                startTimeError: '',
                endDateError: errorMessage,
                endTime: 'endTime',
                endTimeError: ''
            }
        },
        ,
        {
            id: 5,
            state: {
                eventName: 'event',
                roomName: 'room',
                startDate: 'startDate',
                startTime: 'startTime',
                endDate: 'endDate',
            },
            action: {
                type: actionTypes.ADD_BOOKING
            },
            expected: {
                eventName: 'event',
                eventNameError: '',
                roomName: 'room',
                startDate: 'startDate',
                startDateError: '',
                startTime: 'startTime',
                startTimeError: '',
                endDate: 'endDate',
                endDateError: '',
                endTimeError: errorMessage
            }
        }
    ], (data) => {
        it('should handle various error conditions - ' + data.id, () => {
            let result = addBooking(data.state, data.action);
            
            expect(result).toEqual(data.expected);
    
            // immutability test
            expect(data.state).not.toEqual(result);
        })
    })
    
});