import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
 
import * as actionTypes from '../actions/indexActionTypes'

const AddBookingDrawer = ({muiTheme, add, booking, toggleAdd, addBooking, changeEventName, changeRoomName, changeStartDate, changeStartTime, changeEndDate, changeEndTime }) => {
    return (
        <Drawer 
          docked={false}
          open={add}
          openSecondary={true}
          onRequestChange={toggleAdd}
          width="75%">
          <AppBar 
            title="Add Booking"
            iconStyleLeft={{ display: 'none'}}
            iconStyleRight={{ display: 'none'}} />
            <Paper style={{padding: '0px 30px 30px 30px'}}>
                <div className="date-time-combo">
                    <span className="date-picker">
                        <TextField hintText="Event name" errorText={booking.eventNameError} onChange={changeEventName} value={booking.eventName} />
                    </span>
                    <span className="time-picker">
                        <TextField hintText="Room Name" errorText={booking.roomNameError}
                            onChange={changeRoomName} value={booking.roomName}
                        />
                    </span>
                </div>
                
                <div className="date-time-combo">
                    <span className="date-picker">
                        <DatePicker autoOk={true} container="inline" hideCalendarDate={true} hintText="Start Date" formatDate={ (date) => Moment(date).format('MMMM D, YYYY') }
                            errorText={booking.startDateError} onChange={changeStartDate} value={booking.startDate} maxDate={booking.end}
                            />
                    </span>
                    <span className="time-picker">
                        <TimePicker autoOk={true} hintText="Start Time"
                            errorText={booking.startTimeError} onChange={changeStartTime} value={booking.end}
                         />
                    </span>
                </div>

                <div className="date-time-combo">
                    <span className="date-picker">
                        <DatePicker autoOk={true} container="inline" hideCalendarDate={true} hintText="End Date" formatDate={ (date) => Moment(date).format('MMMM D, YYYY') } 
                            errorText={booking.endDateError} onChange={changeEndDate} value={booking.endDate} minDate={booking.start}
                            />
                    </span>
                    <span className="time-picker">
                        <TimePicker autoOk={true} hintText="End Time" 
                            errorText={booking.endTimeError} onChange={changeEndTime} value={booking.endTime}
                            />
                    </span>
                </div>
            </Paper>
            <FlatButton label="Add" fullWidth={true} style={{ color: muiTheme.palette.secondaryTextColor,
             borderWidth: '1px 0px 1px 0px', borderStyle:'solid', borderColor: muiTheme.palette.primary3Color, backgroundColor: muiTheme.palette.primary1Color }}
             labelStyle={{textTransform: 'none'}}
             onTouchTap={() => addBooking(booking)}/>
        </Drawer>
    )
}

AddBookingDrawer.propTypes = {
    toggleAdd: PropTypes.func.isRequired,
    addBooking: PropTypes.func.isRequired
  }
 
export default AddBookingDrawer;