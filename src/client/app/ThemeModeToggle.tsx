import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import SettingsBrightnessRoundedIcon from '@mui/icons-material/SettingsBrightnessRounded';
import { useColorScheme } from '@mui/material/styles';
import { ENABLE_DARK_MODE } from './flags';

type Mode = 'light' | 'dark' | 'system';

const MODES = [
  { value: 'light', label: 'Claro', Icon: LightModeRoundedIcon },
  { value: 'dark', label: 'Oscuro', Icon: DarkModeRoundedIcon },
  { value: 'system', label: 'Sistema', Icon: SettingsBrightnessRoundedIcon },
] as const;

type Props = { force?: boolean };

// `force` solo lo usa /_design para probar el modo oscuro con el flag apagado.
function ThemeModeToggle({ force = false }: Props) {
  const { mode, setMode } = useColorScheme();
  if (!ENABLE_DARK_MODE && !force) return null;
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={mode ?? null}
      onChange={(_e, value: Mode | null) => {
        if (value) setMode(value);
      }}
      aria-label="Tema de color"
    >
      {MODES.map((m) => (
        <ToggleButton
          key={m.value}
          value={m.value}
          aria-label={m.label}
          title={m.label}
        >
          <m.Icon fontSize="small" />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default ThemeModeToggle;
