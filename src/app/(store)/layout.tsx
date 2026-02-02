import { ClerkProvider } from '@clerk/nextjs';

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <main>{children}</main>
    </ClerkProvider>
  );
}
