import { ServiceForm } from '@/components/admin/service-form';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ChevronLeft } from 'lucide-react';

export default async function NewServicePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/services"
        className="inline-flex items-center text-sm font-medium text-white/40 hover:text-white transition-colors"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Services
      </Link>
      
      <ServiceForm />
    </div>
  );
}
