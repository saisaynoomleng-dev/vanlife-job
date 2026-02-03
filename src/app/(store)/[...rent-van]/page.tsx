import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

const RentVan = async ({
  searchParams,
}: {
  searchParams: Promise<{ slug: string }>;
}) => {
  const { slug } = await searchParams;
  const { userId } = await auth();

  if (!userId) return (await auth()).redirectToSignIn();
  if (!slug) notFound();

  return <div>{userId}</div>;
};

export default RentVan;
