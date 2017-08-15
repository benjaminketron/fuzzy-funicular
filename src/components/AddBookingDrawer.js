import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar';
import DatePicker from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
 
import * as actionTypes from '../actions/indexActionTypes'

const AddBookingDrawer = ({muiTheme, add, toggleAdd}) => {
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
            <Paper style={{padding: '0px 30px 0px 30px'}}>
                <TextField hintText="Event name" /><br/>
                <TextField hintText="Room Name"/>
                <DatePicker container="inline" hideCalendarDate={true} hintText="Start Date" />
                <DatePicker container="inline" hideCalendarDate={true} hintText="Start Time" />
                <TimePicker hintText="End Date" />
                <TimePicker hintText="End Time" />
            </Paper>
            <FlatButton label="Add" fullWidth={true} style={{ color: muiTheme.palette.secondaryTextColor,
             borderWidth: '1px 0px 1px 0px', borderStyle:'solid', borderColor: muiTheme.palette.primary3Color, backgroundColor: muiTheme.palette.primary1Color }}
             labelStyle={{textTransform: 'none'}}
             onTouchTap={() => console.log('submit form')}/>
        </Drawer>
    )
}

AddBookingDrawer.propTypes = {
    toggleAdd: PropTypes.func.isRequired
  }
 
export default AddBookingDrawer;