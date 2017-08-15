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

const DayListItem = ({muiTheme, bookings, days }) => {
    const items = days.map((day) => {
        const test = day.bookingIds.map((id) =>  bookings[id] );
        console.log(test);
        let nestedItems = null;
        
        if (day.bookingIds.length) {
            nestedItems = day.bookingIds.map((id) => 
            bookings[id]
            ).map((booking) => {
                let result = null;
                if (booking) {
                    result = <ListItem key={booking.id} primaryText={booking.eventName} nestedLevel={0}/>    
                }
                
                return result;
            });
        }
        else {
            nestedItems = [1].map(() => 
                <ListItem primaryText={!!day.end ? 'You have no bookings for these dates.' : 'You have no bookings for this date.'}
                    nestedLevel={0}/>
            );
        }
        
            
        return (
        <ListItem key={day.date.getTime().toString()} primaryText={day.date.toString()} 
            nestedItems={nestedItems} autoGenerateNestedIndicator={false} initiallyOpen={true}>
        </ListItem>
        )
    })
    return (
        <List>
            {items}
        </List>
    );
}


export default DayListItem;