import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import GraphqlClient from './GraphqlClient';

// palette #edc951 • #eb6841 • #cc2a36 • #4f372d • #00a0b0

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FF6E31',
            },
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 20,
  },
  palette: {
    primary: {
      main: '#FF6E31',
    },
    white: {
      main: '#fff',
    },
    bsYellow: {
      main: '#FFF009',
    },
    bsBrown: {
      main: '#51503C',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GraphqlClient>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GraphqlClient>
  </React.StrictMode>
);
