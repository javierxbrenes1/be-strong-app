import {
  CssVarsTheme,
  Theme,
  useColorScheme,
  useTheme,
} from '@mui/material/styles';

type SchemeName = 'light' | 'dark';

// Valores resueltos (no variables CSS) porque las librerías de gráficos los necesitan.
export function chartPalette(theme: Theme & CssVarsTheme, scheme: SchemeName) {
  const pal = theme.colorSchemes[scheme]?.palette ?? theme.palette;
  return {
    primary: pal.primary.main,
    primaryInk: pal.primaryInk,
    grid: pal.divider,
    text: pal.text.primary,
    muted: pal.text.secondary,
  };
}

// theme.palette.mode no cambia con el esquema; hay que leerlo de useColorScheme.
function useChartColors() {
  const theme = useTheme<Theme & CssVarsTheme>();
  const { colorScheme } = useColorScheme();
  return chartPalette(theme, colorScheme === 'dark' ? 'dark' : 'light');
}

export default useChartColors;
