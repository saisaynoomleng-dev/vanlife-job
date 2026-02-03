import z from 'zod';

export const NewsletterFormSchema = z.object({
  email: z.email(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(5, 'Name must have at least 5 characters'),
  email: z.email(),
  subject: z.string().min(10, 'Subject must have at least 10 characters'),
  message: z
    .string()
    .min(100, 'Message should contain at least 100 characters'),
});
