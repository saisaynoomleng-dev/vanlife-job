'use client';

import { handleNewsletterForm } from '@/actions/newsletterForm';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import { Input } from './ui/input';
import SubmitButton from './SubmitButton';
import { toast } from 'sonner';

const initialFormState = {
  status: '',
  message: '',
};

const NewsletterForm = () => {
  const [state, actionFunction] = useActionState(
    handleNewsletterForm,
    initialFormState,
  );

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message);
    }
    if (state.status == 'error') {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <Form action={actionFunction} className="flex flex-col gap-y-4">
      <div className="space-y-3">
        <label htmlFor="newsletter-email" className="formLabel">
          Email
        </label>
        <Input
          name="email"
          id="newsletter-email"
          placeholder="Johndoe@example.com"
          autoComplete="email"
        />
        {state.status == 'error' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>
      <SubmitButton>Subscribe</SubmitButton>
    </Form>
  );
};

export default NewsletterForm;
