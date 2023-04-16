import React from 'react';
import { keyframes, styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  padding: '5px',
  display: 'grid',
  gridTemplateColumns: '1fr',
  backgroundColor: '#F8f8f8',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  zIndex: '100',
  backgroundColor: '#000',
  backgroundImage: 'url(/logo.jpeg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  borderTopLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const visible = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const LoginForm = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

const LoginContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  paddingTop: '10%',
  alignItems: 'start',
  flexDirection: 'column',
  width: '80%',
  margin: '0 auto',
  animation: `${visible} 2s ease-out 1`,
});

const Form = styled('form')(({ theme }) => ({
  margin: '24px 0',
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

function LoginPage() {
  const theme = useTheme();

  return (
    <Container>
      <LoginForm>
        <LoginContainer>
          <Typography variant="h4">Bienvenido</Typography>
          <Typography variant="body2" color="rgba(0, 0, 0, 0.6)">
            La fuerza y el crecimiento llegan del esfuerzo continuo.
          </Typography>
          <Form>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Usuario"
                color="primary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                type="password"
                variant="outlined"
                label="Contraseña"
                color="primary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button variant="outlined" sx={{ width: '50%', alignSelf: 'end' }}>
              Ingresar
            </Button>
          </Form>
        </LoginContainer>
      </LoginForm>
      <Logo />
    </Container>
  );
}

export default LoginPage;
