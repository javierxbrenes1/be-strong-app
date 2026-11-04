import { CssVarsTheme, Theme, useTheme } from '@mui/material/styles';

// Valores resueltos (no variables CSS) porque las librerías de gráficos los necesitan.
function useChartColors() {
  const theme = useTheme<Theme & CssVarsTheme>();
  const pal = theme.colorSchemes[theme.palette.mode]?.palette ?? theme.palette;
  return {
    primary: pal.primary.main,
    primaryInk: pal.primaryInk,
    grid: pal.divider,
    text: pal.text.primary,
    muted: pal.text.secondary,
  };
}

export default useChartColors;
