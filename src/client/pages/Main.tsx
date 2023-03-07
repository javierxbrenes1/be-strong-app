import { Hidden, styled, alpha } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import Nabvar from '../components/Navbar';

const Container = styled(Grid)(({ theme }) => ({
  padding: '10px',
  background: alpha('#1628E9', 0.8), // `linear-gradient(0deg, #1628E9, ${})`,
  height: '100vh',
  width: '100vw',
}));

const PageContainer = styled(Grid)(({ theme }) => ({
  borderRadius: '30px',
  background: '#F3F4FA', // TODO: adjust theme pallete
  width: '100%',
  heigth: '100%',
}));

function Main() {
  return (
    <Container container md={12}>
      <Hidden smDown>
        <Grid item sm={1} md={2}>
          <Nabvar />
        </Grid>
      </Hidden>
      <PageContainer sm={11} md={10}>
        <Outlet />
      </PageContainer>
    </Container>
  );
}

export default Main;
