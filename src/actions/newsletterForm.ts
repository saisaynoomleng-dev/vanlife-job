'use server';

import db from '@/db';
import { NewsletterSubscriptionTable } from '@/db/schema';
import { PrevNewsletterActionProps } from '@/lib/types';
import { NewsletterFormSchema } from '@/lib/zodSchema';

export const handleNewsletterForm = async (
  prevState: PrevNewsletterActionProps,
  formData: FormData,
): Promise<PrevNewsletterActionProps> => {
  try {
    const rawData = {
      email: formData.get('email')?.toString().trim() || '',
    };

    const results = NewsletterFormSchema.safeParse(rawData);

    if (!results.success) {
      const firstError = results.error.issues[0];

      return {
        status: 'error',
        message: firstError.message,
      };
    }

    const { email } = results.data;

    await db
      .insert(NewsletterSubscriptionTable)
      .values({
        email,
      })
      .onConflictDoNothing({ target: NewsletterSubscriptionTable.email });

    return {
      status: 'success',
      message: 'Thank you for your subscription!',
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'Something went wrong! Try again later!',
    };
  }
};
