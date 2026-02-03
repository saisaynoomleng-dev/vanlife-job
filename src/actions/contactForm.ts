'use server';

import db from '@/db';
import { ContactTable } from '@/db/schema';
import { PrevContactActionProps } from '@/lib/types';
import { ContactFormSchema } from '@/lib/zodSchema';

export const handleContactForm = async (
  prevState: PrevContactActionProps,
  formData: FormData,
): Promise<PrevContactActionProps> => {
  try {
    const rawData = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      subject: formData.get('subject')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
    };

    const results = ContactFormSchema.safeParse(rawData);

    if (!results.success) {
      const firstError = results.error.issues[0];

      return {
        status: 'error',
        message: firstError.message,
        field: firstError.path[0] as string,
      };
    }

    const { name, email, subject, message } = results.data;

    await db.insert(ContactTable).values({
      name,
      email,
      subject,
      message,
    });

    return {
      status: 'success',
      message: "Thank you for contacting us! We'll be in touch!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Something went wrong! Try again later!',
    };
  }
};
