import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material';
import App from './App';
import GraphqlClient from './GraphqlClient';
import theme from './theme/customTheme';

// palette #edc951 • #eb6841 • #cc2a36 • #4f372d • #00a0b0

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GraphqlClient>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </GraphqlClient>
  </React.StrictMode>
);
