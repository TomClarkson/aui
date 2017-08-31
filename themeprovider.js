import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Proptypes from 'prop-types';

const fontFamily = '"Source Sans Pro", sans-serif';
const muiTheme = getMuiTheme({
  fontFamily,
  palette: {
    primary1Color: '#16b3ff' // controls the highlighted bottom border somehow
  },
  tabs: {
    backgroundColor: '#fff',
    selectedTextColor: '#333'
  }
});

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: Proptypes.element.isRequired 
};

export default ThemeProvider;