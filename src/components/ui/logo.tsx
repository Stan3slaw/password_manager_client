import React from 'react';

import { Icons } from '@/components/ui/icons';

const Logo: React.FC = () => {
  return (
    <div className='relative z-20 flex items-center text-lg font-medium'>
      <Icons.logo />
      Pass
    </div>
  );
};

export default Logo;
