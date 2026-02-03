'use client';

import Link from 'next/link';
import BrandLogo from './BrandLogo';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { UserButton, useUser } from '@clerk/nextjs';

const NAV_LINKS = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Vans', url: '/vans' },
  { name: 'Contacts', url: '/contact-us' },
];

const Header = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="py-5 px-3 flex justify-between items-center">
      <div>
        <BrandLogo />
      </div>

      <nav
        className="flex gap-3 items-center"
        aria-label="Main Menu"
        role="navigation"
      >
        {NAV_LINKS.map((link) => (
          <Link
            href={link.url}
            key={link.url}
            className={clsx(
              'font-medium',
              pathname == link.url && 'font-semibold text-brand-orange-400',
            )}
          >
            {link.name}
          </Link>
        ))}

        {user ? <UserButton /> : <Link href="/sign-up">Sign Up</Link>}
      </nav>
    </header>
  );
};

export default Header;
