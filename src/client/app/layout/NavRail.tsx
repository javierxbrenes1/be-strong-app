import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { NavItem, navItems, settingsItem } from './navItems';

export const RAIL_WIDTH = 76;

function RailLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  return (
    <Box
      component={NavLink}
      to={item.path}
      end={item.path === '/'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        width: 60,
        py: 1,
        borderRadius: '12px',
        color: 'var(--mui-palette-nav-text)',
        textDecoration: 'none',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
        '&.active': {
          bgcolor: 'var(--mui-palette-nav-activeBg)',
          color: 'var(--mui-palette-nav-activeText)',
        },
      }}
    >
      <Icon fontSize="small" />
      <Typography sx={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>
        {item.label === 'Configuración' ? 'Ajustes' : item.label}
      </Typography>
    </Box>
  );
}

function NavRail() {
  return (
    <Box
      component="nav"
      aria-label="Principal"
      sx={{
        position: 'fixed',
        inset: '0 auto 0 0',
        width: RAIL_WIDTH,
        bgcolor: 'var(--mui-palette-nav-bg)',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 2,
        zIndex: 'appBar',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          component="img"
          src="/images/logo.jpeg"
          alt="Be Strong"
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            objectFit: 'cover',
            mb: 2,
          }}
        />
        {navItems.map((item) => (
          <RailLink key={item.path} item={item} />
        ))}
      </Box>
      <RailLink item={settingsItem} />
    </Box>
  );
}

export default NavRail;
