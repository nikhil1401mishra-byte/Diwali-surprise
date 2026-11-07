import { z } from "zod";

export const WishSubmissionSchema = z.object({
  recipient_name: z
    .string()
    .trim()
    .min(1, "Recipient name is required")
    .max(32, "Recipient name cannot exceed 32 characters"),
  wish_message: z
    .string()
    .trim()
    .min(1, "Wish message cannot be empty")
    .max(500, "Wish message cannot exceed 500 characters"),
  consent_given: z
    .boolean()
    .refine((val) => val === true, {
      message: "Consent to share your wish with Nikhil is required to submit",
    }),
});

export type WishSubmissionInput = z.infer<typeof WishSubmissionSchema>;

export interface DiwaliWish {
  id: string;
  recipient_name: string;
  wish_message: string;
  submitted_at: string;
  consent_given: boolean;
  status: "new" | "read" | "archived";
}

