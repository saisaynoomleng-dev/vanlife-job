import clsx from 'clsx';
import Image from 'next/image';

const BrandLogo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logo.png"
      alt=""
      width={80}
      height={80}
      className={clsx('', className)}
    />
  );
};

export default BrandLogo;
