export type PasswordRule = {
  id: 'length' | 'number' | 'upper' | 'special' | 'match';
  label: string;
  ok: boolean;
};

export function passwordRules(pwd: string, confirm: string): PasswordRule[] {
  return [
    { id: 'length', label: 'Al menos 10 caracteres.', ok: pwd.length >= 10 },
    { id: 'number', label: 'Tiene al menos un número.', ok: /\d/.test(pwd) },
    {
      id: 'upper',
      label: 'Tiene al menos una mayúscula.',
      ok: /[A-Z]/.test(pwd),
    },
    {
      id: 'special',
      label: 'Tiene al menos un carácter especial (.!@#$%^&*).',
      ok: /[.!@#$%^&*]/.test(pwd),
    },
    { id: 'match', label: 'Contraseña confirmada.', ok: pwd === confirm },
  ];
}
