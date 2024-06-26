import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import SettingsIcon from '@mui/icons-material/Settings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { PATHS } from '../../common/enums';

const NavbarLink = styled(Link)<{ selected?: boolean }>(({ selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '16px 0',
  width: '90%',
  padding: '4px',
  alignItems: 'center',
  color: '#2D2727',
  textDecoration: 'none',
  borderRadius: '10px',
  '&:hover': {
    cursor: 'pointer',
    background: '#FF6E31',
    color: '#fff',
  },
  ...(selected ? { background: '#FF6E31', color: '#fff' } : {}),
}));

const Container = styled(Box)({
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 1px 4px 0 #e3e3e3',
});

function Nabvar(props: { className?: string; onLinkClick?: () => void }) {
  const { className, onLinkClick } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (path: string) => () => {
    navigate(path, { replace: true });
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <Container className={className}>
      <Box>
        <NavbarLink
          onClick={handleClick(PATHS.HOME)}
          selected={pathname === PATHS.HOME}
        >
          <HomeIcon fontSize="small" />
          <Typography variant="caption">Inicio</Typography>
        </NavbarLink>
        <NavbarLink
          onClick={handleClick(PATHS.MEMBERS)}
          selected={pathname.includes(PATHS.MEMBERS)}
        >
          <PeopleAltIcon fontSize="small" />
          <Typography variant="caption">Miembros</Typography>
        </NavbarLink>
        <NavbarLink
          onClick={handleClick(PATHS.CLASSES)}
          selected={pathname.includes(PATHS.CLASSES)}
        >
          <SportsGymnasticsIcon fontSize="small" />
          <Typography variant="caption">Clases</Typography>
        </NavbarLink>
        <NavbarLink
          onClick={handleClick(PATHS.EQUIPMENT)}
          selected={pathname.includes(PATHS.EQUIPMENT)}
        >
          <FitnessCenterIcon fontSize="small" />
          <Typography variant="caption">Equipo</Typography>
        </NavbarLink>
      </Box>
      <NavbarLink
        onClick={handleClick(PATHS.CONFIGURATIONS)}
        selected={pathname.includes(PATHS.CONFIGURATIONS)}
        sx={{ justifySelf: 'end' }}
      >
        <SettingsIcon fontSize="small" />
      </NavbarLink>
    </Container>
  );
}

export default Nabvar;
