export const getPasswordStrength = (password: string): number => {
  const lengthCheck = /.{12,}/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasNumbers = /[0-9]/;
  const hasSymbols = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
  const commonPatterns = /(1234|abcd|password|qwerty|admin|user)/i;

  const strongPasswordCriteria = [lengthCheck, hasUpperCase, hasLowerCase, hasNumbers, hasSymbols];

  const isStrong = strongPasswordCriteria.every((regex) => regex.test(password)) && !commonPatterns.test(password);

  if (!password) return 1;
  if (isStrong) return 5;
  if (password.length >= 10 && !commonPatterns.test(password)) return 4;
  if (password.length >= 8) return 3;
  if (password.length >= 6) return 2;
  return 1;
};
