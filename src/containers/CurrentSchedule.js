import { connect } from 'react-redux'

import Schedule from '../components/Schedule'
import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        calendar: state.schedule.calendar,
        current: state.schedule.current,
        open: state.mainMenu.open,
        search: state.schedule.search
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrent: (event, date) => {
            dispatch(actions.setCalendarCurrent(date))
        },
        setMenuOpen: open => {
            dispatch(actions.setMenuOpen(open))
        },
        toggleAdd: () => {
            console.log('add')
            dispatch(actions.toggleAdd())
        },
        toggleCalendar: () => {
            dispatch(actions.toggleCalendar())
        },
        toggleSearch: () => {
            console.log('search')
            dispatch(actions.toggleSearch())
        }
    }
}

const CurrentSchedule = connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule)


export default CurrentSchedule
