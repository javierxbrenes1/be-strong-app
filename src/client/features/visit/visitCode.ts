import { decode, isValid } from 'js-base64';

export function decodeVisitCode(param: string | null): string | null {
  if (!param || !isValid(param)) return null;
  return decode(param).trim() || null;
}
