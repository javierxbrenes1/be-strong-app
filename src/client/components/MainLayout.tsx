import { Hidden, styled, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import TopBar from './TopBar';

const Container = styled(Box)(({ theme }) => ({
  background: '#F8f8f8', // alpha('#fe8a71', 0.5), // `linear-gradient(0deg, #1628E9, ${})`,
  minHeight: '100vh',
  width: '100%',
  display: 'grid',
  gridTemplateRows: '40px calc(100vh - 40px)',

  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary,
    },
  },
}));

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '70px 1fr',
  overflow: 'hidden',
  height: '100%',
}));

function Main() {
  return (
    <Container>
      <TopBar />
      <PageContainer>
        <NavBar />
        <Outlet />
      </PageContainer>
    </Container>
  );
}

export default Main;
