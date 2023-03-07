import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import { styled, alpha } from '@mui/material';

const NavbarLink = styled(Link)<{ selected?: boolean }>(({ selected }) => ({
  display: 'flex',
  margin: '16px 0',
  padding: '10px',
  alignItems: 'center',
  color: '#F3F4FA',
  gap: '6px',
  textDecoration: 'none',
  borderRadius: '10px',
  '&:hover': {
    cursor: 'pointer',
    background: alpha('#8C94BD', 0.4),
  },
  ...(selected ? { background: alpha('#8C94BD', 0.3) } : {}),
}));

const LogoBox = styled(Box)({
  height: '150px',
});

const LinkContainer = styled(Box)({
  width: '75%',
});

function Nabvar() {
  return (
    <Grid
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <LogoBox>Logo goes here</LogoBox>
      <LinkContainer>
        <NavbarLink selected>
          <HomeIcon fontSize="medium" />
          <Typography>Inicio</Typography>
        </NavbarLink>
        <NavbarLink>
          <PeopleAltIcon fontSize="medium" />
          <Typography>Miembros</Typography>
        </NavbarLink>
        <NavbarLink>
          <SportsGymnasticsIcon fontSize="medium" />
          <Typography>Clases</Typography>
        </NavbarLink>
      </LinkContainer>
    </Grid>
  );
}

export default Nabvar;
