// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createPalette from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    white: PaletteColorOptions;
    bsYellow: PaletteColorOptions;
    bsBrown: PaletteColorOptions;
  }
}
