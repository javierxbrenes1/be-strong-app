/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import { keyframes, styled } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router';
import { LOGIN } from '../../mutations/login';
import useAuthStore from '../../state/authState';
import { PATHS } from '../../../common/enums';

const Container = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  padding: '2rem',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    '& .animation': {
      display: 'none',
    },
  },
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

const LoginForm = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#F9f9f9',
  borderRadius: '1rem',
  [theme.breakpoints.down('md')]: {
    alignItems: 'start',
    paddingTop: '10%',
  },
  boxShadow: '-1px 1px 15px -3px rgba(0,0,0,0.75)',
}));

const LoginContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '90%',
  margin: '0 auto',
  animation: `${visible} 1s ease-out 1`,
  overflow: 'hidden',
  borderRadius: '16px',
  [theme.breakpoints.down('md')]: {
    width: '85%',
  },
  padding: '16px',
}));

const Form = styled('form')(() => ({
  margin: '1rem 0',
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
      <Stack className="animation" justifyContent="center" alignItems="center">
        <Box sx={{ width: '60%' }}>
          {/** @ts-ignore */}
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="./images/login.json"
          />
        </Box>
      </Stack>
      <LoginForm>
        <LoginContainer>
          <Box
            sx={{
              borderRadius: '50%',
              background: '#000',
              overflow: 'hidden',
            }}
          >
            <img
              src="/images/logo.jpeg"
              alt="logo"
              width="100px"
              height="100px"
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              zIndex: '1',
              alignSelf: 'center',
              marginTop: '1rem',
              fontWeight: 800,
            }}
          >
            Be Strong App
          </Typography>
          <Typography variant="h6">Bienvenido</Typography>
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
