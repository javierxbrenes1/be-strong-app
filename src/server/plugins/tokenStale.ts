// Un token emitido (iat, en segundos) antes del último cambio de contraseña ya no vale.
export const isTokenStale = (
  iat: number | undefined,
  passwordChangedAt: Date | null
) =>
  passwordChangedAt != null &&
  (iat === undefined || iat < Math.floor(passwordChangedAt.getTime() / 1000));
