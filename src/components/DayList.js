import React from 'react'
import { connect } from 'react-redux'
import Moment from 'moment';
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import Calendar from './Calendar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import * as actionTypes from '../actions/indexActionTypes'

const DayListItem = ({muiTheme, bookings, days, search }) => {
    let items = null;
    if (search) {
        items = days.filter((day) => day.bookingIds.length );
    }
    else {
        items = days;
    }

    items = items.map((day) => {
        let nestedItems = null;
        let bookingsList = day.bookingIds.map((id) => 
            bookings[id]
        ).filter((booking) => 
            !!booking && !booking.hidden
        );

        day.hidden = day.bookingIds.length && !bookingsList.length;

        if (bookingsList.length) {
            nestedItems = bookingsList.map((booking) => {
                let result = null;
                if (booking) {
                    result = <ListItem key={booking.id} primaryText={booking.eventName} nestedLevel={0}/>    
                }
                
                return result;
            });
        }
        else {
            nestedItems = [1].map((empty) => 
            <ListItem key={(day.date.getTime() + empty).toString()} primaryText={!!day.end ? 'You have no bookings for these dates.' : 'You have no bookings for this date.'}
                nestedLevel={0}/>
            );
        }
            
        return !day.hidden ? (

        <ListItem key={day.date.getTime().toString()} primaryText={day.date.toString()} 
            nestedItems={nestedItems} autoGenerateNestedIndicator={false} initiallyOpen={true}>
        </ListItem>
        ) 
        :
        <ListItem key="no bookings" primaryText="No bookings."/>
    })
    return (
        <List>
            {items}
        </List>
    );
}

export default DayListItem;