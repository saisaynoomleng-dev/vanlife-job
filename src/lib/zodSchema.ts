import z from 'zod';

export const NewsletterFormSchema = z.object({
  email: z.email(),
});
