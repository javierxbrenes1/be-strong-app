import React, { useState } from 'react';
import { keyframes, styled, useTheme } from '@mui/material/styles';
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
import { useNavigate } from 'react-router';
import { LOGIN } from '../../mutations/login';
import useAuthStore from '../../state/authState';
import { PATHS } from '../../constants';

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
}));

const LoginContainer = styled(Box)({
  height: '100%',
  display: 'flex',
  paddingTop: '10%',
  alignItems: 'start',
  flexDirection: 'column',
  width: '80%',
  margin: '0 auto',
  animation: `${visible} 1s ease-out 1`,
});

const Form = styled('form')(({ theme }) => ({
  margin: '24px 0',
  gap: '12px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

function LoginPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const resetAuth = useAuthStore((state) => state.reset);
  const navigate = useNavigate();

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onError() {
      setError(true);
      resetAuth();
    },
    onCompleted(data: { ownerSignIn: { jwt: string } }) {
      setAuth(data.ownerSignIn.jwt);
      navigate(PATHS.HOME);
    },
  });

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
              {loading ? <CircularProgress color="primary" /> : 'Ingresar'}
            </Button>
          </Form>
        </LoginContainer>
      </LoginForm>
      <Logo />
    </Container>
  );
}

export default LoginPage;
