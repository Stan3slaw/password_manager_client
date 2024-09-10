import { Lock, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';

import CreateUpdateVaultModal from '@/app/components/vault-list/components/create-update-vault-modal/create-update-vault-modal';
import DeleteVaultModal from '@/app/components/vault-list/components/delete-vault-modal/delete-vault-modal';
import { cn } from '@/cdk/utils/cn.util';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface VaultItemProps {
  vaultName: string;
  isCollapsed: boolean;
  isVaultChosen: boolean;
  onSelectVault: (name: string) => void;
}

const VaultItem: React.FC<VaultItemProps> = ({ vaultName, isCollapsed, isVaultChosen, onSelectVault }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return isCollapsed ? (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          onClick={() => onSelectVault(vaultName)}
          variant={isVaultChosen ? 'default' : 'ghost'}
          size='icon'
          className={cn(
            'h-9 w-9',
            isVaultChosen && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
          )}>
          <Lock className='h-4 w-4' />
          <span className='sr-only'>{vaultName}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {vaultName}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Button
      onClick={() => onSelectVault(vaultName)}
      variant={isVaultChosen ? 'default' : 'ghost'}
      size='sm'
      className={cn(
        isVaultChosen && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
        'justify-between'
      )}>
      <div className='flex items-center gap-2'>
        <Lock className='mr-2 h-4 w-4' />
        {vaultName.substring(0, 20)}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='ghost' className='h-6 w-6 p-0' onClick={(e) => e.stopPropagation()}>
            <MoreVertical className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateUpdateVaultModal isOpen={isEditModalOpen} setIsOpen={setIsEditModalOpen} existedVaultName={vaultName} />
      <DeleteVaultModal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} vaultName={vaultName} />
    </Button>
  );
};

export default VaultItem;
