import { ShieldCheck, ShieldClose, ShieldAlert } from 'lucide-react';
import React from 'react';

import { CircularProgress } from '@/components/ui/progress';

import { getPasswordStrength } from './get-password-strength';

export const getPasswordStrengthShieldIcon = (password: string): React.ReactNode => {
  const passwordStrength = getPasswordStrength(password);

  switch (passwordStrength) {
    case 1:
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

interface StrengthPasswordWithDescriptionProps {
  circularProgressValue: number;
  circularProgressFillColor: string;
  description?: string;
  showDescription?: boolean;
}

const StrengthPasswordWithDescription: React.FC<StrengthPasswordWithDescriptionProps> = ({
  showDescription,
  description,
  circularProgressValue,
  circularProgressFillColor,
}) => {
  return (
    <div className='flex items-center justify-center w-max gap-3'>
      {showDescription && <p className='text-xs text-muted-foreground'>{description}</p>}
      <div>
        <CircularProgress fillColor={circularProgressFillColor} value={circularProgressValue} className='h-8 w-8' />
      </div>
    </div>
  );
};

export const getPasswordStrengthCircularIcon = ({
  password,
  showDescription,
}: {
  password: string;
  showDescription?: boolean;
}): React.ReactNode => {
  const passwordStrength = getPasswordStrength(password);

  switch (passwordStrength) {
    case 1:
    case 2:
      return (
        <StrengthPasswordWithDescription
          circularProgressFillColor='rgb(248 113 113)'
          circularProgressValue={20}
          description='Weak password'
          showDescription={showDescription}
        />
      );

    case 3:
      return (
        <StrengthPasswordWithDescription
          circularProgressFillColor='rgb(251 146 60)'
          circularProgressValue={60}
          description='Nice password'
          showDescription={showDescription}
        />
      );

    case 4:
      return (
        <StrengthPasswordWithDescription
          circularProgressFillColor='rgb(74 222 128)'
          circularProgressValue={80}
          description='Excellent password'
          showDescription={showDescription}
        />
      );

    case 5:
      return (
        <StrengthPasswordWithDescription
          circularProgressFillColor='rgb(192 132 252)'
          circularProgressValue={95}
          description='Fantastic password'
          showDescription={showDescription}
        />
      );
  }
};
