import { MouseEvent, useState } from 'react';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../state/authState';
import { WhoAmIDocument } from '../../features/auth/api';
import MemberAvatar from '../../design-system/MemberAvatar';
import ThemeModeToggle from '../ThemeModeToggle';
import { ENABLE_DARK_MODE } from '../flags';
import { titleForPath } from './navItems';
import { PATHS } from '../../../common/enums';

function TopBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const resetAuth = useAuthStore((state) => state.reset);
  const whoAmI = useQuery(WhoAmIDocument).data?.whoAmI;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const go = (path: string) => () => {
    setAnchorEl(null);
    navigate(path);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 'appBar',
        height: 56,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Typography component="h1" variant="h4" sx={{ fontSize: '1.5rem' }}>
        {titleForPath(pathname)}
      </Typography>
      {whoAmI && (
        <IconButton
          size="small"
          aria-label="Menú de usuario"
          onClick={(e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
        >
          <MemberAvatar name={whoAmI.name ?? whoAmI.username ?? ''} size={32} />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={go(PATHS.PROFILE)}>
          <ListItemIcon>
            <AccountCircleRoundedIcon fontSize="small" />
          </ListItemIcon>
          Mi perfil
        </MenuItem>
        <MenuItem
          onClick={go(PATHS.CONFIGURATIONS)}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <ListItemIcon>
            <SettingsRoundedIcon fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        {ENABLE_DARK_MODE && (
          <Box sx={{ px: 2, py: 1 }}>
            <ThemeModeToggle />
          </Box>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            resetAuth();
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default TopBar;
