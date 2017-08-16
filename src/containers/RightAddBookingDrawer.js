import { connect } from 'react-redux'
import AddBookingDrawer from '../components/AddBookingDrawer'

import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        add: state.schedule.add,
        booking: state.addBooking,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleAdd: () => {
            dispatch(actions.toggleAdd())
        },
        changeEventName: (event, eventName) =>  {
            console.log(eventName)
            dispatch(actions.setAddEventName(eventName))
        },
        changeRoomName: (event, roomName) => {
            console.log(roomName)
            dispatch(actions.setAddRoomName(roomName))
        },
        changeStartDate: (event, startDate) => {
            console.log(startDate)
            dispatch(actions.setAddStartDate(startDate))
        },
        changeStartTime: (event, startTime) => {
            console.log(startTime)
            dispatch(actions.setAddStartTime(startTime))
        },
        changeEndDate: (event, endDate) => {
            console.log(endDate)
            dispatch(actions.setAddEndDate(endDate))
        },
        changeEndTime: (event, endTime) => {
            console.log(endTime)
            dispatch(actions.setAddEndTime(endTime))
        },
        addBooking: (booking) => {
            dispatch(actions.addBooking(booking))
        }
    }
}

const RightAddBookingDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBookingDrawer)


export default RightAddBookingDrawer
