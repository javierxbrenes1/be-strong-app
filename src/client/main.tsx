import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import AppProviders from './app/AppProviders';
import 'dayjs/locale/es';

// palette #edc951 • #eb6841 • #cc2a36 • #4f372d • #00a0b0

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
