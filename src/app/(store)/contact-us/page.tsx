import Bounded from '@/components/Bounded';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact VanLife – Get Help With Your Camper Van Rental',
  description:
    'Have questions about renting a camper van or planning your trip? Contact the VanLife team for support, booking help, or general inquiries. We’re here to help you hit the road with confidence.',
};

const ContactPage = () => {
  return (
    <Bounded isPadded>
      <div className="flex flex-col gap-y-3 text-center">
        <h2 className="font-semibold text-fs-500 ">Contact Us</h2>
        <p className="text-brand-black-100/70">
          We are willing to sell our franchises
        </p>
      </div>

      <ContactForm />
    </Bounded>
  );
};

export default ContactPage;
