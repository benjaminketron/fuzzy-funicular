import React from 'react'
import { connect } from 'react-redux'
import Moment from 'moment';
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

import * as actionTypes from '../actions/indexActionTypes'

const Schedule = ({muiTheme, setMenuOpen, calendar, current, toggleCalendar }) => {

    const iconStyles = {
        fontFamily: 'FontAwesome',
        fontSize: '24px',
        lineHeight: '50px',
        marginLeft: '10px',
        color: muiTheme.palette.primary2Color
    }

    const appBarTitle =
        <span>
            <span>{Moment(current).format('MMMM YYYY')} </span>
            { calendar ?
                <span className="fa-angle-up" style={iconStyles}> </span>
            :
                <span className="fa-angle-down" style={iconStyles}> </span>
            }
        </span>
    

    return (
    <div>
        <AppBar title={ appBarTitle }
            onTitleTouchTap={toggleCalendar} 
            onLeftIconButtonTouchTap={() => setMenuOpen(true)}>
        <div>
        <FontIcon
        className="fa-search"
        style={iconStyles}
        />
        <FontIcon
        className="fa-plus"
        style={iconStyles}
        />
        </div>
        </AppBar>
        <Paper>
            <List>
            <ListItem primaryText="Hi"/>
            </List>
        </Paper> 
        <div><FlatButton label="Now" style={{width: muiTheme.nowButton.width}}/></div>
    </div>
    )
}
  
Schedule.propTypes = {
  calendar: PropTypes.bool.isRequired,
  toggleCalendar: PropTypes.func.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired
}

export default Schedule
