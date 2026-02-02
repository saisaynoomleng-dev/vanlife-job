import { BoundedProps } from '@/lib/types';
import clsx from 'clsx';

const Bounded = ({
  children,
  as: Comp = 'section',
  className,
  isPadded,
}: BoundedProps) => {
  return (
    <Comp
      className={clsx(
        'py-6 md:py-10 lg:py-16 space-y-5 md:space-y-8 lg:space-y-12 min-h-screen',
        isPadded && 'px-5 md:px-8 lg:px-10',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Bounded;
