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

const DayListItem = ({muiTheme, bookings, days, search, today }) => {
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
                    let bookingStart = booking.start;
                    if (bookingStart < day.date) {
                        bookingStart = day.date;
                    }

                    let bookingEnd = booking.end;
                    if (bookingEnd >= Moment(day.date).add(1, 'days')) {
                        bookingEnd = Moment(day.date).add(1, 'days').subtract(1, 'seconds')
                    }

                    let timeSpan = bookingEnd - bookingStart;
                    let timeUnit = ''
                    if (timeSpan < (1000 * 60 * 60)) {
                        timeUnit = 'minutes';
                        timeSpan /= (1000 * 60);
                    } else if (timeSpan > (1000 * 60 * 60) && timeSpan < (1000 * 60 * 60 * 24)) {
                        timeUnit = 'hours';
                        timeSpan /= (1000 * 60 * 60);
                    } else {
                        timeUnit = 'days'
                        timeSpan /= (1000 * 60 * 60 * 24);
                    }
                    
                    let occurring = bookingStart <= today && today <= bookingEnd;

                    result = (
                    <ListItem key={booking.id}>
                        <div className="booking">
                            <span className="booking-times">
                                <span>{Moment(bookingStart).format("hh:mm A")}</span><br/>
                                <span>{Moment(bookingEnd).format("hh:mm A")}</span><br/>
                                <span>{Moment.duration(timeSpan, timeUnit).humanize()}</span><br/>
                            </span>
                            <span className="booking-info">
                                <span>{booking.eventName}</span><br/>
                                <span>{booking.roomName}</span><br/>
                                <span className="booking-info-occuring fa fa-calendar-check-o"></span>
                                { occurring ? 
                                    <span>occurring</span>
                                    :
                                    null
                                }
                            </span>
                        </div>
                    </ListItem>    
                    ) 
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
            
        let dateFormat ='ddd MMM DD';
        
        let todayText = Moment(today).format(dateFormat)        
        let startText = Moment(day.date).format(dateFormat);
        if (startText === todayText) {
            startText = 'Today'
        }

        let endText = null;
        if (day.end) {
            endText = Moment(day.end).format(dateFormat);
            if (endText === todayText) {
                endText = 'Today'
            }
        }

        let result = (
            <ListItem key="no bookings" primaryText="No bookings."/>
        )

        if (!day.hidden) {
            let primaryText = startText;
            if (!!endText) {
                primaryText = primaryText + ' - ' + endText;
            }

            result = (
                <ListItem key={day.date.getTime().toString()} primaryText={primaryText}
                    nestedItems={nestedItems} autoGenerateNestedIndicator={false} initiallyOpen={true} style={{textTransform: 'uppercase'}}>
                </ListItem>
            )
        }

        return result;
    })
    return (
        <List>
            {items}
        </List>
    );
}

export default DayListItem;