export interface VaultItem {
  id: string | null;
  name: string;
  website: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vault {
  [key: string]: VaultItem[];
}

export interface VaultFormData {
  id: string | null;
  name: string;
  website: string;
  username: string;
  password: string;
}
