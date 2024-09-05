import { Lock } from 'lucide-react';
import React from 'react';

import { cn } from '@/cdk/utils/cn.util';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => onSelectVaultGroup(vaultGroup)}
                  variant={isGroupChosen ? 'default' : 'ghost'}
                  size='icon'
                  className={cn(
                    'h-9 w-9',
                    isGroupChosen &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
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
              key={index}
              variant={isGroupChosen ? 'default' : 'ghost'}
              size='sm'
              className={cn(
                isGroupChosen && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}>
              <Lock className='mr-2 h-4 w-4' />
              {vaultGroup}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default VaultGroupList;
