import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavRail, { RAIL_WIDTH } from './NavRail';
import BottomNav, { BOTTOM_NAV_HEIGHT } from './BottomNav';
import TopBar from './TopBar';

function AppLayout() {
  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <NavRail />
      <Box
        sx={{
          ml: { md: `${RAIL_WIDTH}px` },
          pb: {
            xs: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
            md: 0,
          },
          minWidth: 0,
        }}
      >
        <TopBar />
        <Box component="main">
          <Outlet />
        </Box>
      </Box>
      <BottomNav />
    </Box>
  );
}

export default AppLayout;
