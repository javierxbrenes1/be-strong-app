// Todos con contraste >= 5:1 contra blanco.
export const AVATAR_COLORS = [
  '#7C3AED',
  '#0E7490',
  '#B45309',
  '#BE185D',
  '#15803D',
  '#1D4ED8',
  '#9333EA',
  '#C2410C',
];

export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (words.length === 0) return '?';
  return words
    .map((w) => Array.from(w)[0]?.toLocaleUpperCase('es') ?? '')
    .join('');
}

export function avatarColor(name: string): string {
  const sum = Array.from(name).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length] ?? AVATAR_COLORS[0];
}
