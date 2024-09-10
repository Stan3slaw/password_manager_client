import { ShieldCheck, ShieldClose, ShieldAlert } from 'lucide-react';
import React from 'react';

import { getPasswordStrength } from '@/cdk/utils/get-password-strength';

export const getVaultItemIcon = (password: string): React.ReactNode => {
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
