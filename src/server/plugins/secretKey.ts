// Solo exige que exista: la longitud mínima se quitó para conservar el secret que ya usan las sesiones.
export function getSecretKey(env: NodeJS.ProcessEnv = process.env): string {
  const secret = (env.SECRET_KEY ?? '').trim();
  if (!secret) {
    throw new Error('SECRET_KEY is missing or empty');
  }
  return secret;
}
