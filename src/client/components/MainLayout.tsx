import { keyframes, styled, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import NavBar from './Navbar';
import TopBar from './TopBar';

const Container = styled(Box)(({ theme }) => ({
  background: '#F8f8f8', // alpha('#fe8a71', 0.5), // `linear-gradient(0deg, #1628E9, ${})`,
  minHeight: '100vh',
  width: '100%',
  display: 'grid',
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary,
    },
  },
  gridTemplateRows: '40px calc(100vh - 40px)',
}));

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  overflow: 'hidden',
  height: '100%',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '70px 1fr',
  },
}));

const navbarVisible = keyframes`
from {
  transform: translateX(-70px);
  opacity: 0;
}
to {
  transform: translateX(0);
  opacity: 1;
}
`;

const navbarVisibleReverse = keyframes`
from {
  transform: translateX(0);
}
to {
  transform: translateX(-70px);
}
`;

const MobileNavBar = styled(Box)(() => ({
  position: 'absolute',
  top: '40px',
  left: 0,
  backdropFilter: 'blur(5px)',
  width: '100%',
  height: '100%',
  display: 'flex',
  '& div': {
    width: '70px',
    animation: `${navbarVisible} .5s ease-out`,
  },
  '& div.closing': {
    animation: `${navbarVisibleReverse} .4s ease-out`,
    animationFillMode: 'forwards',
  },
}));

function Main() {
  const [showMobileNavBar, setShowMobileNavBar] = useState(false);
  const [closingClass, setClosingClass] = useState('');
  const theme = useTheme();
  const isUpMD = useMediaQuery(theme.breakpoints.up('md'));

  const handleOnNavbarClick = () => {
    if (!showMobileNavBar) {
      setShowMobileNavBar(true);
      return;
    }
    setClosingClass('closing');
  };

  return (
    <Container>
      <TopBar onBurgerMenuClick={handleOnNavbarClick} />
      <PageContainer>
        {isUpMD && <NavBar />}
        <Outlet />
      </PageContainer>
      {!isUpMD && showMobileNavBar && (
        <MobileNavBar
          onAnimationEnd={() => {
            if (closingClass) {
              setClosingClass('');
              setShowMobileNavBar(false);
            }
          }}
        >
          <NavBar className={closingClass} onLinkClick={handleOnNavbarClick} />
        </MobileNavBar>
      )}
    </Container>
  );
}

export default Main;
