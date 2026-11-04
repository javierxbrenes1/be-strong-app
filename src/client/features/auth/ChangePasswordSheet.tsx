import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/VisibilityRounded';
import VisibilityOff from '@mui/icons-material/VisibilityOffRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import CancelIcon from '@mui/icons-material/CancelRounded';
import { AppSheet } from '../../design-system';
import { UpdatePwdDocument } from './api';
import { passwordRules } from './passwordRules';
import useAuthStore from '../../state/authState';
import BsShowError from '../../components/BsShowError';
import { PATHS } from '../../../common/enums';

type Props = { open: boolean; onClose: () => void };

const ERROR_MESSAGE =
  'No se pudo actualizar la contraseña. Intenta de nuevo o refresca la página.';

function PasswordField(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  const { label, value, onChange, autoFocus } = props;
  const [show, setShow] = useState(false);
  return (
    <TextField
      label={label}
      value={value}
      autoFocus={autoFocus}
      autoComplete="new-password"
      type={show ? 'text' : 'password'}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={() => setShow((s) => !s)}
                edge="end"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

function ChangePasswordSheet({ open, onClose }: Props) {
  const navigate = useNavigate();
  const resetAuth = useAuthStore((s) => s.reset);
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [updatePwd, { loading }] = useMutation(UpdatePwdDocument);
  const rules = passwordRules(pwd, confirm);

  const save = async () => {
    try {
      const { data } = await updatePwd({ variables: { pwd } });
      if (!data?.updatePwd) throw new Error('updatePwd responded false');
      toast.success('Contraseña actualizada. Inicia sesión de nuevo.');
      resetAuth();
      navigate(PATHS.LOGIN, { replace: true });
    } catch (err) {
      BsShowError(err, ERROR_MESSAGE);
    }
  };

  return (
    <AppSheet
      open={open}
      onClose={onClose}
      title="Cambiar contraseña"
      dirty={Boolean(pwd || confirm)}
      primaryAction={{
        label: 'Guardar',
        onClick: save,
        loading,
        disabled: !rules.every((r) => r.ok),
      }}
    >
      <Stack spacing={2.5}>
        <Typography variant="body2" color="text.secondary">
          Al actualizar la contraseña se cerrará la sesión.
        </Typography>
        <PasswordField
          label="Contraseña"
          value={pwd}
          onChange={setPwd}
          autoFocus
        />
        <PasswordField
          label="Confirmar contraseña"
          value={confirm}
          onChange={setConfirm}
        />
        <Stack
          component="ul"
          spacing={1}
          sx={{ listStyle: 'none', p: 0, m: 0 }}
        >
          {rules.map((r) => (
            <Stack
              component="li"
              key={r.id}
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center' }}
            >
              {r.ok ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : (
                <CancelIcon color="error" fontSize="small" />
              )}
              <Typography variant="body2">{r.label}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </AppSheet>
  );
}

export default ChangePasswordSheet;
