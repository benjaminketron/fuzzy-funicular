import { connect } from 'react-redux'

import Schedule from '../components/Schedule'
import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        calendar: state.schedule.calendar,
        current: state.schedule.current,
        open: state.mainMenu.open
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMenuOpen: open => {
            dispatch(actions.setMenuOpen(open))
        },
        toggleCalendar: () => {
            dispatch(actions.toggleCalendar())
        }
    }
}

const CurrentSchedule = connect(
    mapStateToProps,
    mapDispatchToProps
)(Schedule)


export default CurrentSchedule
