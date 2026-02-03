'use client';

import BrandLogo from './BrandLogo';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
  return (
    <footer className="py-10 px-5 grid grid-cols-2 justify-between gap-y-5">
      <div>
        <BrandLogo />
      </div>

      <div className="flex flex-col gap-y-5 justify-center">
        <h2 className="font-semibold text-fs-500 text-center">
          Subscribe For our Newsletter
        </h2>

        <NewsletterForm />
      </div>

      <div className="col-span-full flex justify-between items-center">
        <p>
          copyright&copy;<span>{new Date().getFullYear()}</span> vanlife
        </p>
        <p>Developed by Sai Say Noom Leng</p>
      </div>
    </footer>
  );
};

export default Footer;
