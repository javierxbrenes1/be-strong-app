const MIN_SECRET_KEY_LENGTH = 32;

export function getSecretKey(env: NodeJS.ProcessEnv = process.env): string {
  const secret = (env.SECRET_KEY ?? '').trim();
  if (secret.length < MIN_SECRET_KEY_LENGTH) {
    throw new Error(
      `SECRET_KEY is missing or shorter than ${MIN_SECRET_KEY_LENGTH} characters`
    );
  }
  return secret;
}
