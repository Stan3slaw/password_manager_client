'use client';

import { AxiosError } from 'axios';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import DisplayVault from '@/app/components/display-vault/display-vault';
import UserDropdownMenu from '@/app/components/user-dropdown-menu/user-dropdown-menu';
import VaultGroupList from '@/app/components/vault-groups-list/vault-group-list';
import VaultItemsList from '@/app/components/vault-items-list/vault-items-list';
import { useVault } from '@/cdk/hooks/use-vault';
import { VaultFormData, VaultItem } from '@/cdk/types/vault.type';
import { cn } from '@/cdk/utils/cn.util';
import { encryptVault } from '@/cdk/utils/crypto.util';
import SearchInput from '@/components/shared/search-input/search-input';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';

interface VaultDashboardProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const VaultDashboard: React.FC<VaultDashboardProps> = ({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}) => {
  const { vault, vaultKey, refresh } = useVault();

  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isEditingFlow, setIsEditingFlow] = useState(false);
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultItem | null | undefined>();
  const [selectedVaultGroupName, setSelectedVaultGroupName] = useState(Object.keys(vault)[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const isCreationFlow = selectedVaultItem === null;

  const mutation = useMutation(saveVault, {
    onSuccess: async () => {
      await refresh();
      setIsEditingFlow(false);
      setSelectedVaultItem(undefined);
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast({
        variant: 'destructive',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (error?.response?.data as any)?.message,
      });
    },
  });

  const form = useForm<VaultFormData>({
    values: {
      id: selectedVaultItem?.id ?? null,
      name: selectedVaultItem?.name ?? 'Login',
      website: selectedVaultItem?.website ?? '',
      username: selectedVaultItem?.username ?? '',
      password: selectedVaultItem?.password ?? '',
    },
  });

  const vaultItems = useMemo(() => (vault ? vault[selectedVaultGroupName] : []), [vault, selectedVaultGroupName]);

  const matchedVaultItems = useMemo(
    () =>
      vaultItems.filter((vaultItem) => {
        const vaultItemInfo = vaultItem.name + vaultItem.website + vaultItem.username;
        return vaultItemInfo.toLowerCase().includes(searchQuery.toLowerCase());
      }),
    [vaultItems, searchQuery]
  );

  function handleSubmit(): void {
    const vaultValues = form.getValues();
    let updatedVault;

    if (isCreationFlow) {
      updatedVault = {
        ...vault,
        [selectedVaultGroupName]: [...vaultItems, { ...vaultValues, createdAt: new Date(), updatedAt: new Date() }],
      };
    } else {
      updatedVault = {
        ...vault,
        [selectedVaultGroupName]: vaultItems.map((vaultItem) => {
          if (vaultItem.id === vaultValues.id) {
            return { ...vaultItem, ...vaultValues, updatedAt: new Date() };
          }

          return vaultItem;
        }),
      };
    }

    const encryptedVault = encryptVault({
      vault: JSON.stringify(updatedVault),
      vaultKey,
    });

    window.sessionStorage.setItem('vault', JSON.stringify(updatedVault));

    mutation.mutate({
      encryptedVault,
    });
  }

  function handleSelectVaultItem(vaultItem: VaultItem): void {
    setSelectedVaultItem(vaultItem);
    setIsEditingFlow(false);
  }

  function handleCreateNewVaultItem(): void {
    setSelectedVaultItem(null);
    setIsEditingFlow(false);
  }

  function handleCancelEditVaultItem(): void {
    if (isCreationFlow) {
      setSelectedVaultItem(undefined);
    } else {
      form.reset();
    }

    setIsEditingFlow(false);
  }

  function handleEditVaultItem(): void {
    setIsEditingFlow(true);
  }

  function handleSelectVaultGroup(vaultGroup: string): void {
    setSelectedVaultGroupName(vaultGroup);
    setSelectedVaultItem(undefined);
  }

  function handleDeleteVaultItem(): void {
    const updatedVault = {
      ...vault,
      [selectedVaultGroupName]: [...vaultItems.filter((item) => item.id !== selectedVaultItem?.id)],
    };

    const encryptedVault = encryptVault({
      vault: JSON.stringify(updatedVault),
      vaultKey,
    });

    window.sessionStorage.setItem('vault', JSON.stringify(updatedVault));

    mutation.mutate({
      encryptedVault,
    });
  }

  return (
    <div className='h-screen flex justify-center items-center p-4'>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction='horizontal'
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
          }}
          className='h-full items-stretch rounded-md border border-input'>
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
            }}
            onResize={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
            }}
            className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}>
            <UserDropdownMenu isCollapsed={isCollapsed} />
            <Separator />
            <VaultGroupList
              isCollapsed={isCollapsed}
              selectedVaultGroupName={selectedVaultGroupName}
              onSelectVaultGroup={handleSelectVaultGroup}
              vaultGroups={Object.keys(vault) ?? []}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <div className='flex items-center justify-between p-2'>
              <SearchInput onChange={setSearchQuery} />
              <Button variant='outline' size='icon' onClick={handleCreateNewVaultItem}>
                +
              </Button>
            </div>
            <Separator className='mb-4' />
            <VaultItemsList
              items={matchedVaultItems}
              selectedVaultItem={selectedVaultItem}
              setSelectedVaultItem={handleSelectVaultItem}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <DisplayVault
              isCreationFlow={isCreationFlow}
              isEditingFlow={isEditingFlow}
              form={form}
              vaultItem={selectedVaultItem}
              onEdit={handleEditVaultItem}
              onSubmit={handleSubmit}
              onCancel={handleCancelEditVaultItem}
              onDelete={handleDeleteVaultItem}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  );
};

export default VaultDashboard;
