import { describe, expect, it } from 'vitest';
import { loginSchema } from './schemas';

describe('loginSchema', () => {
  it('requires username', () => {
    expect(
      loginSchema.safeParse({ username: '', pwd: 'x' }).error!.issues[0]
    ).toMatchObject({ path: ['username'], message: 'Requerido' });
  });
  it('requires pwd', () => {
    expect(
      loginSchema.safeParse({ username: 'thomas', pwd: '' }).error!.issues[0]
    ).toMatchObject({ path: ['pwd'], message: 'Requerido' });
  });
  it('trims username but not pwd', () => {
    expect(loginSchema.parse({ username: ' thomas ', pwd: ' a ' })).toEqual({
      username: 'thomas',
      pwd: ' a ',
    });
  });
});
