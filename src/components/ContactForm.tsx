'use client';

import { handleContactForm } from '@/actions/contactForm';
import Form from 'next/form';
import { useActionState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import SubmitButton from './SubmitButton';

const initialFormState = {
  status: '',
  message: '',
  field: '',
};

const ContactForm = () => {
  const [state, actionFunction] = useActionState(
    handleContactForm,
    initialFormState,
  );

  return (
    <Form action={actionFunction} className="flex flex-col gap-y-5">
      <div className="space-y-3">
        <label htmlFor="contact-name" className="formLabel">
          Name
        </label>
        <Input
          type="text"
          name="name"
          id="contact-name"
          placeholder="John Doe"
          required
          autoComplete="name"
        />
        {state.status === 'error' && state.field === 'name' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="contact-email" className="formLabel">
          Email
        </label>
        <Input
          type="email"
          name="email"
          id="contact-email"
          placeholder="johndoe@example.com"
          required
          autoComplete="email"
        />
        {state.status === 'error' && state.field === 'email' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="contact-subject" className="formLabel">
          Subject
        </label>
        <Input
          type="text"
          name="subject"
          id="contact-subject"
          placeholder="Buying the franchise"
        />
        {state.status === 'error' && state.field === 'subject' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="contact-message" className="formLabel">
          Message
        </label>
        <Textarea
          name="message"
          id="contact-message"
          placeholder="I'd like to..."
        />
        {state.status === 'error' && state.field === 'message' && (
          <p className="form-error-message">{state.message}</p>
        )}
      </div>

      <SubmitButton>Submit</SubmitButton>
    </Form>
  );
};

export default ContactForm;
