import { AES, enc, SHA256 } from 'crypto-js';
import pbkdf2 from 'crypto-js/pbkdf2';

interface VaultWithVaultKey {
  vaultKey: string;
  vault: string;
}

interface MetaDataForVaultKey {
  email: string;
  hashedPassword: string;
  salt: string;
}

export const hashPassword = (password: string): string => {
  return SHA256(password).toString();
};

export const generateVaultKey = ({ email, hashedPassword, salt }: MetaDataForVaultKey): string => {
  return pbkdf2(`${email}:${hashedPassword}`, salt, {
    keySize: 32,
    iterations: 10000,
  }).toString();
};

export const decryptVault = ({ vaultKey, vault }: VaultWithVaultKey): string | null => {
  const bytes = AES.decrypt(vault, vaultKey);
  const decrypted = bytes.toString(enc.Utf8);

  try {
    return JSON.parse(decrypted);
  } catch (e) {
    return null;
  }
};

export const encryptVault = ({ vaultKey, vault }: VaultWithVaultKey): string => {
  return AES.encrypt(JSON.stringify(vault), vaultKey).toString();
};
