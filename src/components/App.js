import React from 'react'
import { blue500, grey300, grey400, darkBlack } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CurrentSchedule from '../containers/CurrentSchedule'
import LeftMainMenu from '../containers/LeftMainMenu'
import RightAddBookingDrawer from '../containers/RightAddBookingDrawer'
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// 87, 141, 233
// #578DE9

// import AddTodo from '../containers/AddTodo'
// import VisibleTodoList from '../containers/VisibleTodoList'

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey300,
    primary2Color: blue500,
    primary3Color: grey400,
    textColor: darkBlack,
    secondaryTextColor: blue500,
    alternateTextColor: darkBlack,
  },
  
  appBar: {
     height: 50
  },
  nowButton: {
    width: '100%'
  }
});

const App = ({dispatch}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
    <CurrentSchedule muiTheme={muiTheme}/>
    <LeftMainMenu/>
    <RightAddBookingDrawer muiTheme={muiTheme}/>
    </div>    
    
  </MuiThemeProvider>
);

// const App = () => (
//   <div>
//     <AddTodo />
//     <VisibleTodoList />
//     <Footer />
//   </div>
// )

export default App
