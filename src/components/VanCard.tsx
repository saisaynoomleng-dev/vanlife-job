import { formatCurrency } from '@/lib/formatter';
import { VanCardProps } from '@/lib/types';
import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import VanTypeText from './VanTypeText';

const VanCard = ({ className, ...props }: VanCardProps) => {
  const { name, pricePerDay, slug, type, mainImage } = props;

  return (
    <Link
      href={`/vans/${slug?.current}`}
      className={clsx('flex flex-col gap-y-5 group rounded-sm', className)}
    >
      <div className="overflow-hidden">
        {mainImage?.alt && mainImage.asset?.url ? (
          <Image
            src={urlFor(mainImage.asset.url).format('webp').url()}
            alt={mainImage.alt || ''}
            width={300}
            height={300}
            priority
            loading="eager"
            className="w-75 h-75 group-hover:scale-[1.05] duration-200 transition-all ease-in-out rounded-sm"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <p className="font-semibold">{name}</p>
          {pricePerDay && (
            <p className="flex flex-col">
              <span className="font-semibold">
                {formatCurrency(pricePerDay)}
              </span>
              <span className="self-end">/day</span>
            </p>
          )}
        </div>
        {type && <VanTypeText type={type} className="self-start" />}
      </div>
    </Link>
  );
};

export default VanCard;
