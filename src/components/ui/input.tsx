import * as React from 'react';

import { cn } from '@/cdk/utils/cn.util';

export enum InputVariant {
  Standart = 'standard',
  Outlined = 'outlined',
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = InputVariant.Outlined, ...props }, ref) => {
    if (variant === InputVariant.Standart) {
      return (
        <input
          type={type}
          className={cn(
            'h-9 w-full bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }

    if (variant === InputVariant.Outlined) {
      return (
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }
  }
);
Input.displayName = 'Input';

export { Input };
