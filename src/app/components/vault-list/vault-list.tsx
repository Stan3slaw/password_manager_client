import React from 'react';

import VaultItem from '@/app/components/vault-list/components/vault-item/vault-item';

interface VaultListProps {
  isCollapsed: boolean;
  selectedVaultName: string;
  vaultNames: string[];
  onSelectVault: (name: string) => void;
}

const VaultList: React.FC<VaultListProps> = ({ vaultNames, isCollapsed, selectedVaultName, onSelectVault }) => {
  return (
    <div data-collapsed={isCollapsed} className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
      <div className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {vaultNames.map((vaultName, index) => {
          const isVaultChosen = selectedVaultName === vaultName;

          return (
            <VaultItem
              key={`${vaultName}_${index}`}
              vaultName={vaultName}
              isVaultChosen={isVaultChosen}
              isCollapsed={isCollapsed}
              onSelectVault={onSelectVault}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VaultList;
