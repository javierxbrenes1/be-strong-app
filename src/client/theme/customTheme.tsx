import { createTheme } from '@mui/material';
// import { esEs as dataGridDeDE } from '@mui/x-data-grid';
import { esEs as coreEsEs } from '@mui/material/locale';
import { esEs } from '@mui/x-date-pickers/locales';

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    bsYellow: Palette['primary'];
    bsBrown: Palette['primary'];
  }

  interface PaletteOptions {
    white: PaletteOptions['primary'];
    bsYellow: PaletteOptions['primary'];
    bsBrown: PaletteOptions['primary'];
  }
}

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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
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
  // esEs,
});

export default theme;
