import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: '#92EFE5',
      },
    },
    MuiButton: {
      flatPrimary: {
        color: 'white',
        backgroundColor: '#92EFE5',
        borderRadius: 5,
        '&:hover': {
          textDecoration: 'none',
          backgroundColor: 'black',
        },
      },
      disabled: {
        backgroundColor: 'transparent',
      },
      fab: {
        backgroundColor: '#92EFE5',
        '&:hover': {
          backgroundColor: '#009374',
        },
      },
    },
  },
});

export default ({ children }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);
