import React, { useState } from 'react';
import { keyframes, styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useMutation } from '@apollo/client';
import { useNavigate, Navigate } from 'react-router';
import { LOGIN } from '../../mutations/login';
import useAuthStore from '../../state/authState';
import { PATHS } from '../../constants';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  backgroundColor: '#F8f8f8',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'none',
    gridTemplateRows: '1fr 2fr',
  },
}));

const Logo = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  zIndex: '100',
  backgroundColor: '#000',
  backgroundImage: 'url(/logo.jpeg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
}));

const visible = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}
`;

const LoginForm = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    alignItems: 'start',
    paddingTop: '10%',
  },
}));

const LoginContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '50%',
  margin: '0 auto',
  animation: `${visible} 1s ease-out 1`,
  overflow: 'hidden',
  borderRadius: '16px',
  '&:before': {
    position: 'absolute',
    content: '""',
    height: '150vh',
    width: '150px',
    background: theme.palette.primary.main,
    animation: `${rotate} 6s linear infinite`,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    backgroundColor: '#F8f8f8',
    inset: '2.5px',
    borderRadius: '16px',
  },
  [theme.breakpoints.down('md')]: {
    width: '85%',
  },
  padding: '16px',
}));

const Form = styled('form')(() => ({
  margin: '24px 0',
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  zIndex: 1,
}));

function LoginPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const { setAuth, isAuth } = useAuthStore();
  const resetAuth = useAuthStore((state) => state.reset);

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onError() {
      setError(true);
      resetAuth();
    },
    onCompleted(data: { ownerSignIn: { jwt: string } }) {
      setAuth(data.ownerSignIn.jwt);
    },
  });

  if (isAuth) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  const handleOnChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { target } = ev;
    if (target.name === 'pwd') {
      setPassword(target.value);
      return;
    }
    setUserName(target.value);
  };

  const handleOnKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key.toLocaleLowerCase() === 'enter') {
      onLogin();
    }
  };

  const showHidePassword = () => {
    setShowPwd(!showPwd);
  };

  const onLogin = () => {
    loginMutation({
      variables: {
        input: {
          username,
          pwd: password,
        },
      },
    });
  };

  const helperText = error ? 'Usuario o contraseña incorrectos' : '';

  return (
    <Container>
      <Logo />
      <LoginForm>
        <LoginContainer>
          <Typography variant="h6" sx={{ zIndex: '1', alignSelf: 'start' }}>
            Bienvenido
          </Typography>
          <Form>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Usuario"
                color="primary"
                name="username"
                error={error}
                helperText={helperText}
                onChange={handleOnChange}
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
                type={!showPwd ? 'password' : 'text'}
                variant="outlined"
                label="Contraseña"
                name="pwd"
                error={error}
                helperText={helperText}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyPress}
                color="primary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <RemoveRedEyeIcon
                        color="primary"
                        sx={{ '&:hover': { cursor: 'pointer' } }}
                        onClick={showHidePassword}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{ color: '#fff', alignSelf: 'end' }}
              disabled={!username || !password || loading}
              onClick={onLogin}
            >
              <span>Ingresar</span>
              {loading && (
                <CircularProgress
                  color="primary"
                  size={15}
                  sx={{ marginLeft: '5px' }}
                />
              )}
            </Button>
          </Form>
        </LoginContainer>
      </LoginForm>
    </Container>
  );
}

export default LoginPage;
