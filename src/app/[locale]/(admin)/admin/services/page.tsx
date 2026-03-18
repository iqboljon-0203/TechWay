import { createClient } from '@/lib/supabase/server';
import ServicesList from '@/components/admin/services-list';

export default async function AdminServicesPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  return <ServicesList initialServices={services || []} />;
}
