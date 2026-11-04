import { SvgIconComponent } from '@mui/icons-material';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { PATHS } from '../../../common/enums';

export type NavItem = {
  label: 'Hoy' | 'Miembros' | 'Clases' | 'Equipo' | 'Configuración';
  path: string;
  icon: SvgIconComponent;
};

export const navItems: NavItem[] = [
  { label: 'Hoy', path: PATHS.HOME, icon: TodayRoundedIcon },
  { label: 'Miembros', path: PATHS.MEMBERS, icon: PeopleAltRoundedIcon },
  { label: 'Clases', path: PATHS.CLASSES, icon: EventAvailableRoundedIcon },
  { label: 'Equipo', path: PATHS.EQUIPMENT, icon: FitnessCenterRoundedIcon },
];

export const settingsItem: NavItem = {
  label: 'Configuración',
  path: PATHS.CONFIGURATIONS,
  icon: SettingsRoundedIcon,
};

export const pageTitles: Record<string, string> = {
  [PATHS.HOME]: 'Hoy',
  [PATHS.MEMBERS]: 'Miembros',
  [PATHS.CLASSES]: 'Clases',
  [PATHS.EQUIPMENT]: 'Equipo',
  [PATHS.CONFIGURATIONS]: 'Configuración',
  [PATHS.PROFILE]: 'Mi perfil',
};

export const titleForPath = (pathname: string): string => {
  const root = `/${pathname.split('/')[1] ?? ''}`;
  return pageTitles[root] ?? 'Be Strong';
};
