import { z } from "zod";

// =============================================================================
// User Validation Schemas
// =============================================================================

export const UpdateUserPreferencesSchema = z.object({
  preferredLanguage: z.string().length(2).optional(),
  notificationsEnabled: z.boolean().optional(),
  emailNotificationsEnabled: z.boolean().optional(),
});

export const UpdateDisplayNameSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .max(100, "Display name too long")
    .refine((s) => /^[\w\s.\-']+$/u.test(s), { message: "Display name contains invalid characters" }),
});

export type UpdateDisplayNameInput = z.infer<typeof UpdateDisplayNameSchema>;
export type UpdateUserPreferencesInput = z.infer<typeof UpdateUserPreferencesSchema>;
