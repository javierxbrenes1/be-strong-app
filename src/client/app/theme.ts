import { createTheme, CssVarsTheme, Theme } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface Palette {
    surface2: string;
    primaryInk: string;
    primarySoft: string;
    nav: { bg: string; text: string; activeBg: string; activeText: string };
    soft: { success: string; warning: string; error: string; info: string };
  }
  interface PaletteOptions {
    surface2?: string;
    primaryInk?: string;
    primarySoft?: string;
    nav?: { bg: string; text: string; activeBg: string; activeText: string };
    soft?: { success: string; warning: string; error: string; info: string };
  }
  interface TypographyVariants {
    metric: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    metric?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    metric: true;
  }
}

const DISPLAY = '"Barlow Condensed", "Inter", sans-serif';
const display = {
  fontFamily: DISPLAY,
  fontWeight: 700,
  fontVariantNumeric: 'tabular-nums',
} as const;

const baseTheme = createTheme(
  {
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
      light: {
        palette: {
          background: { default: '#F6F6F4', paper: '#FFFFFF' },
          text: { primary: '#18181B', secondary: '#5B5B63' },
          divider: '#E2E2DE',
          primary: { main: '#FACC15', contrastText: '#18181B' },
          success: { main: '#15803D' },
          warning: { main: '#B45309' },
          error: { main: '#B91C1C' },
          info: { main: '#1D4ED8' },
          surface2: '#EFEFEC',
          primaryInk: '#854D0E',
          primarySoft: '#FEF9C3',
          soft: {
            success: '#DCFCE7',
            warning: '#FEF3C7',
            error: '#FEE2E2',
            info: '#DBEAFE',
          },
          nav: {
            bg: '#18181B',
            text: '#A1A1AA',
            activeBg: '#FACC15',
            activeText: '#18181B',
          },
        },
      },
      dark: {
        palette: {
          background: { default: '#0F0F10', paper: '#18181B' },
          text: { primary: '#F4F4F5', secondary: '#A1A1AA' },
          divider: '#2E2E33',
          primary: { main: '#FACC15', contrastText: '#18181B' },
          success: { main: '#4ADE80' },
          warning: { main: '#FBBF24' },
          error: { main: '#F87171' },
          info: { main: '#60A5FA' },
          surface2: '#222226',
          primaryInk: '#FDE047',
          primarySoft: '#3a3210',
          soft: {
            success: '#12301d',
            warning: '#3a2a0a',
            error: '#3b1515',
            info: '#132640',
          },
          nav: {
            bg: '#0B0B0C',
            text: '#8B8B94',
            activeBg: '#FACC15',
            activeText: '#18181B',
          },
        },
      },
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: display,
      h2: display,
      h3: display,
      h4: display,
      metric: { ...display, fontSize: '2rem', lineHeight: 1.1 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            borderRadius: 12,
            border: `1px solid ${t.vars.palette.divider}`,
            boxShadow: 'none',
            backgroundImage: 'none',
          }),
        },
      },
      MuiDialog: {
        styleOverrides: { paper: { borderRadius: 16 } },
      },
      MuiDrawer: {
        styleOverrides: { paper: { backgroundImage: 'none' } },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: ({ ownerState, theme: t }) => ({
            textTransform: 'none',
            fontWeight: 600,
            // El amarillo nunca es color de texto: los acentos usan primaryInk.
            ...(ownerState.color === 'primary' &&
              ownerState.variant !== 'contained' && {
                color: t.vars.palette.primaryInk,
                ...(ownerState.variant === 'outlined' && {
                  borderColor: t.vars.palette.primaryInk,
                }),
              }),
          }),
        },
      },
      MuiTab: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            textTransform: 'none',
            fontWeight: 600,
            '&.Mui-selected': { color: t.vars.palette.primaryInk },
          }),
        },
      },
      MuiLink: {
        styleOverrides: {
          root: ({ theme: t }) => ({ color: t.vars.palette.primaryInk }),
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            // El label enfocado no usa el amarillo (ilegible sobre superficies claras).
            '&.Mui-focused:not(.Mui-error)': {
              color: t.vars.palette.primaryInk,
            },
          }),
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            '&.Mui-focusVisible': {
              outline: `2px solid ${t.vars.palette.primaryInk}`,
              outlineOffset: -2,
            },
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme: t }) => ({
            '&.Mui-focused:not(.Mui-error)': {
              boxShadow: `0 0 0 3px ${t.vars.palette.primarySoft}`,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: t.vars.palette.primaryInk,
                borderWidth: 1,
              },
            },
          }),
        },
      },
      MuiChip: {
        styleOverrides: { root: { fontWeight: 600 } },
      },
    },
  },
  esES
);

// createTheme tipa el resultado sin colorSchemes aunque cssVariables esté activo.
const theme = baseTheme as Theme & CssVarsTheme;

export default theme;
