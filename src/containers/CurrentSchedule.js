import { connect } from 'react-redux'

import Schedule from '../components/Schedule'
import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        calendar: state.schedule.calendar,
        current: state.schedule.current,
        open: state.mainMenu.open,
        search: state.schedule.search,
        searchText: state.schedule.searchText,
        today: state.schedule.today
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchBooking: (event, searchText) => {
            dispatch(actions.searchBooking(searchText))
        },
        setCurrent: (event, date) => {
            dispatch(actions.setCalendarCurrent(date))
        },
        setMenuOpen: open => {
            dispatch(actions.setMenuOpen(open))
        },
        toggleAdd: () => {
            dispatch(actions.toggleAdd())
        },
        toggleCalendar: () => {
            dispatch(actions.toggleCalendar())
        },
        toggleSearch: () => {
            dispatch(actions.toggleSearch())
        }
    }
}

const CurrentSchedule = connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule)


export default CurrentSchedule
