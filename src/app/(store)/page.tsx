import Bounded from '@/components/Bounded';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <Bounded className="flex flex-col justify-center items-center homeBg text-brand-white px-5">
      <h2 className="font-semibold text-fs-500 capitalize">
        You got the travel plans, we got the travel vans.
      </h2>
      <p>
        Add adventure to your life by joining the #vanlife movement. Rent the
        perfect van to make your perfect road trip.
      </p>
      <CTA
        href="/vans"
        className="bg-brand-orange-400 hover:bg-brand-orange-400/80 self-start min-w-full"
      >
        Find your van
      </CTA>
    </Bounded>
  );
}
