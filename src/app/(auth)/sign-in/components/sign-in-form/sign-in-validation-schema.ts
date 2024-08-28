import { z } from 'zod';

import {
  MAX_EMAIL_CHARACTERS,
  MAX_PASSWORD_CHARACTERS,
  MIN_PASSWORD_CHARACTERS,
} from '@/cdk/constants/forms.constants';

export const signInSchema = z.object({
  email: z.string().max(MAX_EMAIL_CHARACTERS, 'Email max length 60 characters').email('Invalid email'),
  password: z
    .string()
    .max(MAX_PASSWORD_CHARACTERS, 'Password max length 60 characters')
    .min(
      MIN_PASSWORD_CHARACTERS,
      'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
    )
    .regex(/[A-Z]/, 'Password must contain at least 1 upper case letter')
    .regex(/[0-9]/, 'Password must contain at least 1 number')
    .regex(/\W/, 'Password must contain at least 1 special character'),
});
