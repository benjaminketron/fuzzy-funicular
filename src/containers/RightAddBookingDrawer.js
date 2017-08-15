import { connect } from 'react-redux'
import AddBookingDrawer from '../components/AddBookingDrawer'

import * as actions from '../actions/index'

const mapStateToProps = state => {
    return {
        add: state.schedule.add
    }
}

const mapDispatchToProps = dispatch => {
        return {
            toggleAdd: () => {
            dispatch(actions.toggleAdd())
        }
    }
}

const RightAddBookingDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBookingDrawer)


export default RightAddBookingDrawer
