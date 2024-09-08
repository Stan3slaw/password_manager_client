import React from 'react';

import VaultGroupItem from '@/app/components/vault-groups-list/components/vault-group-item/vault-group-item';

interface VaultGroupListProps {
  isCollapsed: boolean;
  selectedVaultGroupName: string;
  vaultGroups: string[];
  onSelectVaultGroup: (name: string) => void;
}

const VaultGroupList: React.FC<VaultGroupListProps> = ({
  vaultGroups,
  isCollapsed,
  selectedVaultGroupName,
  onSelectVaultGroup,
}) => {
  return (
    <div data-collapsed={isCollapsed} className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'>
      <div className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {vaultGroups.map((vaultGroup, index) => {
          const isGroupChosen = selectedVaultGroupName === vaultGroup;

          return (
            <VaultGroupItem
              key={`${vaultGroup}_${index}`}
              vaultGroup={vaultGroup}
              isGroupChosen={isGroupChosen}
              isCollapsed={isCollapsed}
              onSelectVaultGroup={onSelectVaultGroup}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VaultGroupList;
