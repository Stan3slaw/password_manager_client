import { z } from 'zod';

import { MAX_VAULT_GROUP_CHARACTERS, MIN_VAULT_GROUP_CHARACTERS } from '@/cdk/constants/forms.constants';

export const createUpdateVaultGroupSchema = z.object({
  vaultGroup: z
    .string()
    .max(MAX_VAULT_GROUP_CHARACTERS, 'Vault Group max length 20 characters')
    .min(MIN_VAULT_GROUP_CHARACTERS, 'Vault group should not be empty'),
});
