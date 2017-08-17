import { connect } from 'react-redux'

import DayList from '../components/DayList'

const mapStateToProps = state => {
    return {
        bookings: state.schedule.bookings,
        days: state.schedule.days,
        search: state.schedule.search,
        today: state.schedule.today
    } 
}

const mapDispatchToProps = dispatch => {
    return {
        focus = ((day, element) => {
            if (day.focus) {
                dispatch(action.focus(element));                
            }
        })
    }
}

const CurrentDayList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DayList)

export default CurrentDayList
