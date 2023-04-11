export const calculateAge = (dateBirth: Date): number => {
  const diff = new Date().getTime() - dateBirth.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
