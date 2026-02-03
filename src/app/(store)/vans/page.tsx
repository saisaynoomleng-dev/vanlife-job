import Bounded from '@/components/Bounded';
import VanCard from '@/components/VanCard';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_VANS_QUERY } from '@/sanity/lib/sanityQueries';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Camper Vans for Rent – Browse Travel Vans & Book Online | VanLife',
  description:
    'Browse our fleet of fully equipped camper vans and travel vans for rent. Compare prices, features, and availability, then book your perfect van online with VanLife for your next road trip.',
};

const VAN_FILTER = [
  { name: 'simple', query: 'simple' },
  { name: 'rugged', query: 'rugged' },
  { name: 'luxury', query: 'luxury' },
];

const VAN_TYPES = {
  simple: '#e17654',
  rugged: '#115e59',
  luxury: '#161616',
};

const VanPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) => {
  const { page, type } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const totalVanPerPage = 3;
  const startIndex = (currentPage - 1) * totalVanPerPage;
  const endIndex = startIndex + totalVanPerPage;

  const { data: vans } = await sanityFetch({
    query: ALL_VANS_QUERY,
    params: { startIndex, endIndex },
  });

  const totalPages = Math.ceil(vans.total / totalVanPerPage);
  const allVans = vans.vans;

  return (
    <Bounded isPadded>
      <div className="flex flex-col gap-y-5">
        <h2 className="font-semibold text-fs-500">Explore our van options</h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3">
            {VAN_FILTER.map((van) => (
              <Link
                href={{
                  pathname: '/vans',
                  query: {
                    ...(page && { page }),
                    type: van.query,
                  },
                }}
                key={van.query}
                className={clsx(
                  'font-semibold capitalize px-2 py-1 bg-brand-orange-100/50',
                )}
                style={{
                  backgroundColor:
                    type === van.query
                      ? VAN_TYPES[type as 'simple' | 'rugged' | 'luxury']
                      : '',
                  color: type === van.query ? '#fff7ed' : '#252525',
                }}
              >
                {van.name}
              </Link>
            ))}
          </div>
          {type && (
            <Link
              href={{
                pathname: '/vans',
                query: {
                  ...(page && { page }),
                },
              }}
              className="bg-red-400 text-brand-black-200 font-semibold px-2 py-1"
            >
              Clear Filter
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {allVans.map((van) => (
          <VanCard key={van.slug?.current} {...van} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="flex gap-x-3 items-center justify-center">
          <Link
            href={{
              pathname: '/vans',
              query: {
                ...(type && { type }),
                page: currentPage === 1 ? currentPage : currentPage - 1,
              },
            }}
            className={clsx(
              currentPage === 1
                ? 'pointer-events-none text-brand-black-200/50'
                : 'pointer-events-auto text-brand-black-200',
            )}
          >
            <FaArrowLeft />
          </Link>

          {Array.from({ length: totalPages })
            .map((_, i) => i + 1)
            .map((pageNum) => (
              <Link
                href={{
                  pathname: '/vans',
                  query: {
                    ...(type && { type }),
                    page: pageNum,
                  },
                }}
                key={pageNum}
                className={clsx(
                  currentPage === pageNum
                    ? 'font-semibold text-brand-orange-400'
                    : 'text-brand-black-200',
                )}
              >
                {pageNum}
              </Link>
            ))}

          <Link
            href={{
              pathname: '/vans',
              query: {
                ...(type && { type }),
                page:
                  currentPage === totalPages ? currentPage : currentPage + 1,
              },
            }}
            className={clsx(
              currentPage === totalPages
                ? 'pointer-events-none text-brand-black-200/50'
                : 'pointer-events-auto text-brand-black-200',
            )}
          >
            <FaArrowRight />
          </Link>
        </div>
      ) : null}
    </Bounded>
  );
};

export default VanPage;
