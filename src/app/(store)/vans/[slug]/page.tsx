import BackTo from '@/components/BackTo';
import Bounded from '@/components/Bounded';
import CTA from '@/components/CTA';
import VanTypeText from '@/components/VanTypeText';
import { formatCurrency, formatSlug } from '@/lib/formatter';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { VAN_QUERY } from '@/sanity/lib/sanityQueries';
import { myPortableTextComponent } from '@/sanity/schemaTypes/myPortableTextComponent';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugFormatted = formatSlug(slug);

  return {
    title: slugFormatted,
  };
}

const VanDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: van } = await sanityFetch({
    query: VAN_QUERY,
    params: await params,
  });

  if (!van) notFound();

  const imageURL = van.mainImage?.asset?.url;
  const imageAlt = van.mainImage?.alt;

  return (
    <Bounded isPadded>
      <BackTo href="/vans">Back to All Vans</BackTo>

      <div>
        {imageURL && imageAlt ? (
          <Image
            src={urlFor(imageURL).format('webp').url()}
            width={1200}
            height={600}
            className=""
            priority
            loading="eager"
            alt={imageAlt || ''}
          />
        ) : null}
      </div>

      <VanTypeText type={van.type} className="max-w-fit" />

      <h2 className="font-semibold text-fs-500">{van.name}</h2>

      {van.pricePerDay && (
        <p>
          <span className="font-semibold">
            {formatCurrency(van.pricePerDay)}
          </span>
          <span>/day</span>
        </p>
      )}

      {van.body && (
        <div className="prose md:prose-lg">
          <PortableText value={van.body} components={myPortableTextComponent} />
        </div>
      )}

      <CTA
        href={`/vans/${van.slug?.current}/rent-van?slug=${van.slug?.current}`}
      >
        Rent this van
      </CTA>
    </Bounded>
  );
};

export default VanDetailPage;
