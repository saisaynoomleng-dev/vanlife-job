import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import { urlFor } from '../lib/image';

export const myPortableTextComponent: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          src={urlFor(props.value).format('webp').url()}
          width={600}
          height={600}
          priority
          alt={props.value.alt || ''}
          className="rounded-sm object-cover"
        />
      ) : null,
  },
};
