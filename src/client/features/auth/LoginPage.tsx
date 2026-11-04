import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/VisibilityRounded';
import VisibilityOff from '@mui/icons-material/VisibilityOffRounded';
import { LoginDocument } from './api';
import { LoginValues, loginSchema } from './schemas';
import { FormTextField } from '../../design-system/form';
import useAuthStore from '../../state/authState';
import { PATHS } from '../../../common/enums';

const BAD_CREDENTIALS = 'Usuario o contraseña incorrectos.';
const NO_CONNECTION = 'No se pudo conectar. Intenta de nuevo.';

function LoginPage() {
  const { setAuth, isAuth } = useAuthStore();
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const { control, handleSubmit, watch } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', pwd: '' },
  });
  const [login, { loading }] = useMutation(LoginDocument);

  // Editar cualquier campo limpia el error del servidor.
  useEffect(() => {
    const sub = watch(() => setError(''));
    return () => sub.unsubscribe();
  }, [watch]);

  if (isAuth) return <Navigate to={PATHS.HOME} replace />;

  const onSubmit = async (input: LoginValues) => {
    setError('');
    try {
      const { data } = await login({ variables: { input } });
      const jwt = data?.ownerSignIn?.jwt;
      if (jwt) setAuth(jwt);
      else setError(BAD_CREDENTIALS);
    } catch (err) {
      const { networkError, graphQLErrors } = err as {
        networkError?: unknown;
        graphQLErrors?: unknown[];
      };
      setError(
        networkError && !graphQLErrors?.length ? NO_CONNECTION : BAD_CREDENTIALS
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
        position: 'relative',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: { xs: 160, sm: 220 },
          bgcolor: 'common.black',
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(250,204,21,0.12) 0 14px, transparent 14px 40px)',
        }}
      />
      <Card
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ position: 'relative', width: '100%', maxWidth: 380, p: 4 }}
      >
        <Stack spacing={2.5} sx={{ alignItems: 'center' }}>
          <Box
            component="img"
            src="/images/logo.jpeg"
            alt="Be Strong"
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              border: 3,
              borderColor: 'primary.main',
              objectFit: 'cover',
              bgcolor: 'common.black',
            }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '1.75rem' }}>
              Be Strong App
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingresa para continuar
            </Typography>
          </Box>
          <FormTextField
            control={control}
            name="username"
            label="Usuario"
            autoComplete="username"
            autoFocus
          />
          <FormTextField
            control={control}
            name="pwd"
            label="Contraseña"
            type={showPwd ? 'text' : 'password'}
            autoComplete="current-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'
                      }
                      onClick={() => setShowPwd((s) => !s)}
                      edge="end"
                    >
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
          >
            Ingresar
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default LoginPage;
