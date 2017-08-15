import { connect } from 'react-redux'

import DayList from '../components/DayList'
import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        bookings: state.schedule.bookings,
        days: state.schedule.days
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

const CurrentDayList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DayList)

export default CurrentDayList
