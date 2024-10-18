import { z } from 'zod';

export const variableNameSchema = z.string()
    .min(1, 'Must be at least 1 character long')
    .regex(/^[a-z0-9_]+$/, 'Can only contain lowercase letters, numbers, and underscores');
