import { createTheme } from '@mui/material';

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
