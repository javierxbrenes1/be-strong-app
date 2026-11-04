import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { navItems } from './navItems';

export const BOTTOM_NAV_HEIGHT = 64;

function BottomNav() {
  return (
    <Box
      component="nav"
      aria-label="Principal"
      sx={{
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-around',
        minHeight: BOTTOM_NAV_HEIGHT,
        pb: 'env(safe-area-inset-bottom)',
        bgcolor: 'var(--mui-palette-nav-bg)',
        zIndex: 'appBar',
      }}
    >
      {navItems.map(({ path, label, icon: Icon }) => (
        <Box
          key={path}
          component={NavLink}
          to={path}
          end={path === '/'}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            color: 'var(--mui-palette-nav-text)',
            textDecoration: 'none',
            '&.active': { color: 'var(--mui-palette-nav-activeBg)' },
          }}
        >
          <Icon fontSize="small" />
          <Typography sx={{ fontSize: 11, fontWeight: 600 }}>
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default BottomNav;
