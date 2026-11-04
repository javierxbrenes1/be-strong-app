import { PASSWORD_CHECKS } from '../../../common/passwordPolicy';

export type PasswordRule = {
  id: 'length' | 'number' | 'upper' | 'special' | 'match';
  label: string;
  ok: boolean;
};

export function passwordRules(pwd: string, confirm: string): PasswordRule[] {
  return [
    {
      id: 'length',
      label: 'Al menos 10 caracteres.',
      ok: PASSWORD_CHECKS.length(pwd),
    },
    {
      id: 'number',
      label: 'Tiene al menos un número.',
      ok: PASSWORD_CHECKS.number(pwd),
    },
    {
      id: 'upper',
      label: 'Tiene al menos una mayúscula.',
      ok: PASSWORD_CHECKS.upper(pwd),
    },
    {
      id: 'special',
      label: 'Tiene al menos un carácter especial (.!@#$%^&*).',
      ok: PASSWORD_CHECKS.special(pwd),
    },
    { id: 'match', label: 'Contraseña confirmada.', ok: pwd === confirm },
  ];
}
