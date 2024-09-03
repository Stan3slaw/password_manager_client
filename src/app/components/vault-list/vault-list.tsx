import { ShieldCheck, ShieldClose, ShieldAlert } from 'lucide-react';
import React from 'react';

import { VaultItem } from '@/cdk/types/vault.type';
import { cn } from '@/cdk/utils/cn.util';
import { getPasswordStrength } from '@/cdk/utils/get-password-strength';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VaultListProps {
  selectedVaultItem?: VaultItem | null;
  setSelectedVaultItem: (vault: VaultItem) => void;
  items: VaultItem[];
}

const getVaultItemIcon = (password: string): React.ReactNode => {
  const passwordStrength = getPasswordStrength(password);
  switch (passwordStrength) {
    case 1:
      return <ShieldClose className='text-red-400' />;
    case 2:
      return <ShieldClose className='text-red-400' />;
    case 3:
      return <ShieldAlert className='text-orange-400' />;
    case 4:
      return <ShieldCheck className='text-green-400' />;
    case 5:
      return <ShieldCheck className='text-purple-400' />;
  }
};

const VaultList: React.FC<VaultListProps> = ({ items, selectedVaultItem, setSelectedVaultItem }) => {
  return (
    <ScrollArea className='h-screen'>
      <div className='flex flex-col gap-2 p-4 pt-0'>
        {items.map((item) => (
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
                  {getVaultItemIcon(item.password)}
                  <div className='font-semibold'>{item.name}</div>
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

export default VaultList;
