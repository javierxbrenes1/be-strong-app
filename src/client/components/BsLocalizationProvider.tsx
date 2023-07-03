import { LocalizationProvider, esES } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';

function BsLocalizationProvider(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es"
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {children}
    </LocalizationProvider>
  );
}

export default BsLocalizationProvider;
