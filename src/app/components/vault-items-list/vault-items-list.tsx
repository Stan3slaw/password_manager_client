import React from 'react';

import { VaultItem } from '@/cdk/types/vault.type';
import { cn } from '@/cdk/utils/cn.util';
import { getPasswordStrengthShieldIcon } from '@/cdk/utils/password-strength-icon.util';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VaultListProps {
  selectedVaultItem?: VaultItem | null;
  setSelectedVaultItem: (vault: VaultItem) => void;
  items: VaultItem[];
}

const VaultItemsList: React.FC<VaultListProps> = ({ items, selectedVaultItem, setSelectedVaultItem }) => {
  return (
    <ScrollArea className='h-screen'>
      <div className='flex flex-col gap-2 p-4 pt-0'>
        {items?.map((item) => (
          <button
            key={item.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              selectedVaultItem?.id === item.id && 'bg-muted dark:bg-muted dark:text-white'
            )}
            onClick={() => setSelectedVaultItem(item)}>
            <div className='flex w-full flex-col gap-1'>
              <div className='flex items-center'>
                <div className='flex items-center gap-2'>
                  {getPasswordStrengthShieldIcon(item.password)}
                  <div className='font-semibold'>{item.name ? item.name : 'Untitled'}</div>
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    selectedVaultItem?.id === item.id ? 'text-foreground' : 'text-muted-foreground'
                  )}
                />
              </div>
              <div className='text-xs font-medium'>{item.username ? item.username : '—'}</div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default VaultItemsList;
