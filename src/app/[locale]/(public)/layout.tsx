import { TopBar } from '@/components/shared/topbar';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen pt-[104px] lg:pt-[112px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
