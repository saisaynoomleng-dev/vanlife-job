'use client';

import { SubmitButtonProps } from '@/lib/types';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';
import LoadingSpinner from './LoadingSpinner';
import clsx from 'clsx';

const SubmitButton = ({ className, children }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={clsx(
        'bg-brand-orange-400 hover:bg-brand-orange-400/80 cursor-pointer',
        className,
      )}
    >
      {pending ? <LoadingSpinner /> : <span>{children}</span>}
    </Button>
  );
};

export default SubmitButton;
