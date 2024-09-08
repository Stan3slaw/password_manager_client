import { Lock, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';

import CreateUpdateVaultGroupModal from '@/app/components/create-update-vault-group-modal/create-update-vault-group-modal';
import DeleteVaultGroupModal from '@/app/components/delete-vault-group-modal/delete-vault-group-modal';
import { cn } from '@/cdk/utils/cn.util';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface VaultGroupItemProps {
  vaultGroup: string;
  isCollapsed: boolean;
  isGroupChosen: boolean;
  onSelectVaultGroup: (name: string) => void;
}

const VaultGroupItem: React.FC<VaultGroupItemProps> = ({
  vaultGroup,
  isCollapsed,
  isGroupChosen,
  onSelectVaultGroup,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return isCollapsed ? (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          onClick={() => onSelectVaultGroup(vaultGroup)}
          variant={isGroupChosen ? 'default' : 'ghost'}
          size='icon'
          className={cn(
            'h-9 w-9',
            isGroupChosen && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
          )}>
          <Lock className='h-4 w-4' />
          <span className='sr-only'>{vaultGroup}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {vaultGroup}
      </TooltipContent>
    </Tooltip>
  ) : (
    <Button
      onClick={() => onSelectVaultGroup(vaultGroup)}
      variant={isGroupChosen ? 'default' : 'ghost'}
      size='sm'
      className={cn(
        isGroupChosen && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
        'justify-between'
      )}>
      <div className='flex items-center gap-2'>
        <Lock className='mr-2 h-4 w-4' />
        {vaultGroup.substring(0, 20)}
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
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <CreateUpdateVaultGroupModal existedVaultGroup={vaultGroup} />
      </Dialog>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DeleteVaultGroupModal vaultGroup={vaultGroup} />
      </Dialog>
    </Button>
  );
};

export default VaultGroupItem;
