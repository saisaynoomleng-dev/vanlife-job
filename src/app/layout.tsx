import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/lib/fonts';
import { SanityLive } from '@/sanity/lib/live';

export const metadata: Metadata = {
  title: {
    template: '%s | VanLife',
    default: 'VanLife',
  },
  description:
    'Book reliable camper vans and travel vans for your next road trip. VanLife makes van rentals simple, affordable, and adventure-ready. Browse vans, choose your dates, and hit the road today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
