import { useContext } from 'react';

import { VaultContext, VaultContextType } from '@/cdk/providers/vault.provider';

export const useVault = (): VaultContextType => {
  const context = useContext(VaultContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
