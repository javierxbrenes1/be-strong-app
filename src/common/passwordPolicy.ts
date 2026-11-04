// Única fuente de la política de contraseñas: la usan la UI (checklist) y el servidor.
export const PASSWORD_CHECKS = {
  length: (p: string) => p.length >= 10,
  number: (p: string) => /\d/.test(p),
  upper: (p: string) => /[A-Z]/.test(p),
  special: (p: string) => /[.!@#$%^&*]/.test(p),
};

export const isStrongPassword = (p: string) =>
  Object.values(PASSWORD_CHECKS).every((check) => check(p));
