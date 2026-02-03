import Bounded from '@/components/Bounded';
import ContactForm from '@/components/ContactForm';

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
