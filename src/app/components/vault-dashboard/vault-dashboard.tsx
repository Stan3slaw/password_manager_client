'use client';

import { AxiosError } from 'axios';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { saveVault } from '@/api';
import DisplayVault from '@/app/components/display-vault/display-vault';
import UserDropdownMenu from '@/app/components/user-dropdown-menu/user-dropdown-menu';
import VaultGroupList from '@/app/components/vault-groups-list/vault-group-list';
import VaultList from '@/app/components/vault-list/vault-list';
import { useVault } from '@/cdk/hooks/use-vault';
import { VaultFormData, VaultItem } from '@/cdk/types/vault.type';
import { cn } from '@/cdk/utils/cn.util';
import { encryptVault } from '@/cdk/utils/crypto.util';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  function handleSubmit(): void {
    const vaultValues = form.getValues();
    let updatedVault;

    if (isCreationFlow) {
      updatedVault = {
        ...vault,
        [selectedVaultGroupName]: [
          ...vault[selectedVaultGroupName],
          { ...vaultValues, createdAt: new Date(), updatedAt: new Date() },
        ],
      };
    } else {
      updatedVault = {
        ...vault,
        [selectedVaultGroupName]: vault[selectedVaultGroupName].map((vaultItem) => {
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

  function handleCancel(): void {
    setSelectedVaultItem(undefined);
    setIsEditingFlow(false);
  }

  function handleEdit(): void {
    setIsEditingFlow(true);
  }

  function handleSelectVaultGroup(vaultGroup: string): void {
    setSelectedVaultGroupName(vaultGroup);
    setSelectedVaultItem(undefined);
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
              <div className='w-full mr-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <form>
                  <div className='relative'>
                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input placeholder='Search' className='pl-8' />
                  </div>
                </form>
              </div>
              <Button variant='outline' size='icon' onClick={handleCreateNewVaultItem}>
                +
              </Button>
            </div>
            <Separator className='mb-4' />
            <VaultList
              items={vault[selectedVaultGroupName]}
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
              onEdit={handleEdit}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  );
};

export default VaultDashboard;