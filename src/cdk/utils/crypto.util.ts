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
  }).toString();
};

export const decryptVault = ({ vaultKey, vault }: VaultWithVaultKey): string | null => {
  const bytes = AES.decrypt(vault, vaultKey);
  const decrypted = bytes.toString(enc.Utf8);

  try {
    return JSON.parse(decrypted).vault;
  } catch (e) {
    return null;
  }
};

export const encryptVault = ({ vaultKey, vault }: VaultWithVaultKey): string => {
  return AES.encrypt(vault, vaultKey).toString();
};
