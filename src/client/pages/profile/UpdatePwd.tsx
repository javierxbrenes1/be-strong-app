import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  DialogContentText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
  onClose: () => void;
};

type Rules = {
  minLength: boolean;
  hasNumber: boolean;
  hasSpecialCharacter: boolean;
  hasUpperCase: boolean;
  confirmEqual: boolean;
};

function getIcon(rules: Rules, prop: string) {
  return rules[prop as keyof typeof rules] ? (
    <CheckCircleIcon color="success" />
  ) : (
    <CancelIcon color="error" />
  );
}

function evaluateRules(pwd: string, confirmPwd: string): Rules {
  const rules = {
    minLength: false,
    hasNumber: false,
    hasSpecialCharacter: false,
    hasUpperCase: false,
    confirmEqual: false,
  };

  rules.minLength = pwd.length >= 10;
  rules.confirmEqual = pwd === confirmPwd;
  rules.hasUpperCase = /.*[A-Z].*/.test(pwd);
  rules.hasNumber = /.*\d.*/.test(pwd);
  rules.hasSpecialCharacter = /.*[.!@#$%^&*].*/.test(pwd);

  return rules;
}

function UpdatePwd(props: Props) {
  const { onClose } = props;
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfimPwd] = useState(false);
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [rules, setRules] = useState<Rules>({
    minLength: false,
    hasNumber: false,
    hasSpecialCharacter: false,
    hasUpperCase: false,
    confirmEqual: false,
  });

  useEffect(() => {
    setRules(evaluateRules(pwd, confirmPwd));
  }, [pwd, confirmPwd]);

  const onTextChange =
    (type: 'pwd' | 'confirmPwd') =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = ev.target;
      if (type === 'pwd') {
        setPwd(value);
      } else {
        setConfirmPwd(value);
      }
    };

  const allRulesPass = Object.values(rules).every((val: boolean) => val);

  return (
    <Dialog open maxWidth="md">
      <DialogTitle>Actualizar contraseña</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nota: Al actualizar la contraseña la sesión se cerrará.
        </DialogContentText>
        <Stack gap="25px" marginY="10px">
          <TextField
            id="password"
            type={showPwd ? 'text' : 'password'}
            onChange={onTextChange('pwd')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPwd((st) => !st)}
                    edge="end"
                  >
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Contraseña"
            variant="outlined"
          />
          <TextField
            id="filled-basic"
            type={showConfirmPwd ? 'text' : 'password'}
            label="Confirmar Contraseña"
            variant="outlined"
            onChange={onTextChange('confirmPwd')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfimPwd((st) => !st)}
                    edge="end"
                  >
                    {showConfirmPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Reglas
            </Typography>
            <Stack direction="row" alignItems="center" gap="5px">
              {getIcon(rules, 'minLength')}
              <Typography>Al Menos 10 carácteres.</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="5px">
              {getIcon(rules, 'hasNumber')}
              <Typography>Tiene al menos un número.</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="5px">
              {getIcon(rules, 'hasUpperCase')}
              <Typography>Tiene al menos una mayúscula.</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="5px">
              {getIcon(rules, 'hasSpecialCharacter')}
              <Typography>
                Tiene al menos un carácter especial (.!@#$%^&*).
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="5px">
              {getIcon(rules, 'confirmEqual')}
              <Typography>Contraseña confirmada.</Typography>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={!allRulesPass}>Guardar</Button>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdatePwd;
