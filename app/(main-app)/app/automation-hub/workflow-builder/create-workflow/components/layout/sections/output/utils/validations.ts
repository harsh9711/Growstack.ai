import { z } from "zod";

export const jsonKeySchema = z
  .string()
  .regex(
    /^[a-z0-9_]*$/,
    "Can only contain lowercase letters, numbers, and underscores"
  );
