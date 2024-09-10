import { z } from 'zod';

import { MAX_VAULT_NAME_CHARACTERS, MIN_VAULT_NAME_CHARACTERS } from '@/cdk/constants/forms.constants';

export const createUpdateVaultSchema = z.object({
  vaultName: z
    .string()
    .max(MAX_VAULT_NAME_CHARACTERS, 'Vault name max length 20 characters')
    .min(MIN_VAULT_NAME_CHARACTERS, 'Vault name should not be empty'),
});
