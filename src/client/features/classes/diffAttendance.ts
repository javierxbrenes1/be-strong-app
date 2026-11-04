export function diffAttendance(initial: string[], selected: string[]) {
  const before = new Set(initial);
  const after = new Set(selected);
  return {
    add: selected.filter((c) => !before.has(c)),
    remove: initial.filter((c) => !after.has(c)),
  };
}
