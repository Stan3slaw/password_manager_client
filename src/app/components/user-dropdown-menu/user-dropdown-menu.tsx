import { useRouter } from 'next/navigation';
import React from 'react';

import { signOut } from '@/api';
import CreateVaultGroupModal from '@/app/components/create-vault-group-modal/create-vault-group-modal';
import { cn } from '@/cdk/utils/cn.util';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/ui/icons';

interface UserDropdownMenuProps {
  isCollapsed: boolean;
}

const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ isCollapsed }) => {
  const router = useRouter();

  async function handleSignOut(): Promise<void> {
    await signOut().then(() => {
      router.push('/sign-in');
    });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className='w-full'>
          <div className={cn('flex h-[52px] items-center justify-center', isCollapsed ? 'h-[52px]' : 'px-2')}>
            <div
              className={cn(
                'flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
                isCollapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>svg]:w-auto [&>span]:hidden'
              )}>
              <Icons.logo />
              <span className={cn('ml-2', isCollapsed && 'hidden')}>user@gmail.com</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DialogTrigger asChild>
            <DropdownMenuItem>Create New Vault</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateVaultGroupModal />
    </Dialog>
  );
};

export default UserDropdownMenu;
