export const getPasswordStrength = (password: string): number => {
  const weak = /[0-9a-zA-_Z!@#$%^&.*]{5,}/;
  const moderate = /[0-9a-zA-_Z!@#$%^&.*]{8,}/;
  const strong = /(?=.*\D)[0-9a-zA-_Z!@#$%^&.*]{8,}$/;
  const excellent = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!_@#$%^&*.])[0-9a-zA-_Z!@#$%^&.*]{8,}$/;

  if (excellent.test(password)) return 5;
  if (strong.test(password)) return 4;
  if (moderate.test(password)) return 3;
  if (weak.test(password)) return 2;
  return 1;
};
