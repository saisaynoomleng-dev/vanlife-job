import { VanTypeTextProps } from '@/lib/types';
import clsx from 'clsx';

const VAN_TYPES = {
  simple: '#e17654',
  rugged: '#115e59',
  luxury: '#161616',
} as const;

const VanTypeText = ({ type, className }: VanTypeTextProps) => {
  if (!type) return null;

  return (
    <div
      className={clsx(
        'uppercase font-semibold text-fs-300 px-2 py-1 text-brand-white rounded-sm',
        className,
      )}
      style={{ backgroundColor: VAN_TYPES[type] }}
    >
      {type}
    </div>
  );
};

export default VanTypeText;
