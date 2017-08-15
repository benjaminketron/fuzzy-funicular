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

const Schedule = ({muiTheme, calendar, current, search, searchBooking, setCurrent, setMenuOpen, toggleAdd, toggleCalendar, toggleSearch, }) => {
    
    const iconStyles = {
        fontFamily: 'FontAwesome',
        fontSize: '24px',
        lineHeight: '50px',
        marginLeft: '15px',
        color: muiTheme.palette.primary2Color
    }

    const menuIconStyles = {...iconStyles,
        marginLeft: '0px',
        marginRight: '10px',        
        color: muiTheme.palette.secondaryTextColor
    }

    const titleIconStyle = {...iconStyles, marginLeft: '0px'}

    const appBarMenu = 
        <FontIcon
        className="fa-bars"
        style={menuIconStyles}
        />

    const appBarTitle =
        <span>
            { !search ?
                <span>
                    <span>{Moment(current).format('MMMM YYYY')} </span>
                    { calendar ?
                        <span className="fa-angle-up" style={titleIconStyle}> </span>
                    :
                        <span className="fa-angle-down" style={titleIconStyle}> </span>
                    }
                </span>
                :
                <span>
                    <TextField hintText="Search" onChange={searchBooking}/>
                </span>
            }
        </span>

    return (
    <div>
        <AppBar 
            className={!search ? 'visible' : 'invisible'}
            title={ appBarTitle }
            iconElementLeft={ appBarMenu }
            onTitleTouchTap={toggleCalendar} 
            onLeftIconButtonTouchTap={() => setMenuOpen(true)}>
        <div>
        <FontIcon
        className="fa-search"
        style={iconStyles}
        onTouchTap={toggleSearch}
        />
        <FontIcon
        className="fa-plus"
        style={iconStyles}
        onTouchTap={toggleAdd}
        />
        </div>
        </AppBar>
        <Paper>
            <Calendar firstDayOfWeek={0} hideCalendarDate={true} open={calendar} onTouchTapDay={setCurrent} initialDate={current}/>
            <List>
            <ListItem primaryText="Hi"/>
            </List>
        </Paper> 
        <Paper><FlatButton label="Now" style={{width: muiTheme.nowButton.width, color: muiTheme.palette.secondaryTextColor,
             backgroundColor: muiTheme.palette.primary1Color}} onTouchTap={() => setCurrent({}, new Date())}/></Paper>
    </div>
    )
}
  
Schedule.propTypes = {
  calendar: PropTypes.bool.isRequired,
  searchBooking: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  toggleAdd: PropTypes.func.isRequired,
  toggleCalendar: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
}

export default Schedule
