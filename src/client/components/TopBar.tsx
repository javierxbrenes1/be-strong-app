import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { IconButton, ListItemIcon, MenuItem, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import useAuthStore from '../state/authState';
import useWhoAmI from '../hooks/useWhoAmI';
import { PATHS } from '../constants';

const Container = styled(Grid)({
  height: '40px',
  background: '#fff',
  width: '100%',
  display: 'flex',
  padding: '0 12px',
  boxShadow: '0 1px 4px #e3e3e3',
});

const BurgerMenu = styled(MenuIcon)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

function TopBar(props: { onBurgerMenuClick: () => void }) {
  const { onBurgerMenuClick } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const resetAuth = useAuthStore((state) => state.reset);
  const whoAmI = useWhoAmI();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToProfile = () => {
    handleClose();
    navigate(PATHS.PROFILE, { replace: true });
  };

  const handleOnLogout = () => {
    handleClose();
    resetAuth();
  };

  return (
    <>
      <Container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <BurgerMenu onClick={onBurgerMenuClick} />
        <Typography component="span" color="#4D4D4D">
          Be Strong App
        </Typography>
        {whoAmI && (
          <IconButton size="small" onClick={handleMenuOpen}>
            <Avatar
              sx={{ width: '28px', height: '28px', background: '#FF6E31' }}
            >
              {whoAmI.name[0]?.toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
        )}
      </Container>
      <Menu
        anchorEl={anchorEl}
        id="main-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '5px !important',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={handleGoToProfile}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Mi Perfil
        </MenuItem>
        <MenuItem onClick={handleOnLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Salir
        </MenuItem>
      </Menu>
    </>
  );
}

export default TopBar;
