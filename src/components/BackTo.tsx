import { BackToProps } from '@/lib/types';
import clsx from 'clsx';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackTo = ({ href, className, children }: BackToProps) => {
  return (
    <Link
      href={href}
      className={clsx('flex gap-x-2 items-center group', className)}
    >
      <span>
        <FaArrowLeft className="size-3 group-hover:-translate-x-1 transition-all duration-200 ease-in-out" />
      </span>
      <span>{children}</span>
    </Link>
  );
};

export default BackTo;
