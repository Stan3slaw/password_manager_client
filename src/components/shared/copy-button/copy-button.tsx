import va from '@vercel/analytics';
import { CheckIcon, ClipboardIcon } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

import { cn } from '@/cdk/utils/cn.util';
import { Button, ButtonProps } from '@/components/ui/button';

interface CopyButtonProps extends ButtonProps {
  value: string;
  event?: Event;
}

const eventSchema = z.object({
  name: z.enum([
    'copy_npm_command',
    'copy_usage_import_code',
    'copy_usage_code',
    'copy_primitive_code',
    'copy_theme_code',
    'copy_block_code',
    'copy_chunk_code',
    'enable_lift_mode',
    'copy_chart_code',
    'copy_chart_theme',
    'copy_chart_data',
    'copy_color',
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z.record(z.union([z.string(), z.number(), z.boolean(), z.null()])).optional(),
});

type Event = z.infer<typeof eventSchema>;

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input);
  if (event) {
    va.track(event.name, event.properties);
  }
}

async function copyToClipboardWithMeta(value: string, event?: Event): Promise<void> {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, className, variant = 'ghost', event, ...props }) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size='icon'
      variant={variant}
      className={cn(
        'relative z-10 h-full w-8 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-4 [&_svg]:w-4',
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        copyToClipboardWithMeta(
          value,
          event
            ? {
                name: event.name,
                properties: {
                  code: value,
                },
              }
            : undefined
        );
        setHasCopied(true);
      }}
      {...props}>
      <span className='sr-only'>Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
};

export default CopyButton;
