import mainMenu from './mainMenu'
import * as actionTypes from '../actions/indexActionTypes'

// sort of weird, but this library really helps keeps things dry
let using = require('jasmine-data-provider');

describe('mainMenu reducer', () => {
    it('should handle initial state', () => {
        expect(mainMenu(undefined, {})).toEqual({
            open: false
        });
    })

    using([
        {
            id: 1,
            state: {
                open: false
            },
            action: {
                type: actionTypes.SET_MENU_OPEN,
                open: true
            },
            expected: {
                open: true
            } 
        },
        {
            id: 1,
            state: {
                open: true
            },
            action: {
                type: actionTypes.SET_MENU_OPEN,
                open: false
            },
            expected: {
                open: false
            }
        }
    ], (data) => {
        it('set menu open - ' + data.id, () => {
            let result = mainMenu(data.state, data.action);
            expect(result).toEqual(data.expected);

            // immutability test
            expect(data.state).not.toEqual(result);
        })
    })
    
})