const lowerCasedAlphabets = [...'abcdefghijklmnopqrstuvwxyz'.split('')];
const upperCasedAlphabets = lowerCasedAlphabets.map((alphabet) => alphabet.toUpperCase());
const numbers = [...'1234567890'.split('')];
const symbols = [...'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')];

const getRandomNumber = (max: number): number => Math.floor(Math.random() * max);

interface GeneratePasswordOptions {
  passwordLength: number;
  isNumbersIncluded?: boolean;
  isSymbolsIncluded?: boolean;
}

export const generatePassword = (options: GeneratePasswordOptions): string => {
  const { passwordLength, isNumbersIncluded, isSymbolsIncluded } = options;
  const allCharacters = [...lowerCasedAlphabets, ...upperCasedAlphabets];

  if (isNumbersIncluded) {
    allCharacters.push(...numbers);
  }
  if (isSymbolsIncluded) {
    allCharacters.push(...symbols);
  }

  // Ensure password has at least one of each required type of character
  const generatedPassword = [];
  generatedPassword.push(upperCasedAlphabets[getRandomNumber(upperCasedAlphabets.length)]);
  generatedPassword.push(lowerCasedAlphabets[getRandomNumber(lowerCasedAlphabets.length)]);

  if (isNumbersIncluded) {
    generatedPassword.push(numbers[getRandomNumber(numbers.length)]);
  }

  if (isSymbolsIncluded) {
    generatedPassword.push(symbols[getRandomNumber(symbols.length)]);
  }

  // Fill the remaining part of the password with random characters
  for (let i = generatedPassword.length; i < passwordLength; i++) {
    generatedPassword.push(allCharacters[getRandomNumber(allCharacters.length)]);
  }

  // Shuffle the password to avoid a predictable pattern
  return generatedPassword.sort(() => Math.random() - 0.5).join('');
};
