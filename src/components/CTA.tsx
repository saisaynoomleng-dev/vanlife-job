import { CTAProps } from '@/lib/types';
import Link from 'next/link';
import { Button } from './ui/button';
import clsx from 'clsx';

const CTA = ({ href, className, children }: CTAProps) => {
  return (
    <Button asChild className={clsx('font-semibold', className)}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default CTA;
