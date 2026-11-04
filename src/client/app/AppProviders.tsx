import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { esES } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GraphqlClient from '../GraphqlClient';
import theme from './theme';
import { ENABLE_DARK_MODE } from './flags';

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GraphqlClient>
      <ThemeProvider
        theme={theme}
        defaultMode={ENABLE_DARK_MODE ? 'system' : 'light'}
      >
        <CssBaseline />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="es"
          localeText={
            esES.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </GraphqlClient>
  );
}

export default AppProviders;
