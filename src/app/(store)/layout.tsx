import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ClerkProvider } from '@clerk/nextjs';

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    </ClerkProvider>
  );
}
