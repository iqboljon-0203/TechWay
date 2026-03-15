'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { submitContact } from '@/app/actions/contact';
import { toast } from 'sonner';
import { Loader2, Mail, MapPin, Phone } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  service: z.string().min(1, 'Please select a service'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const t = useTranslations('Contact');
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      service: '',
      phone: '',
      message: '',
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = (data: ContactFormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('service', data.service);
      if (data.phone) formData.append('phone', data.phone);
      formData.append('message', data.message);

      const result = await submitContact(null, formData);

      if (result.success) {
        toast.success(t('success'));
        reset();
      } else {
        toast.error(t('error'));
      }
    });
  };

  const serviceOptions = [
    { value: 'crm', label: t('services.crm') },
    { value: 'network', label: t('services.network') },
    { value: 'cyber', label: t('services.cyber') },
    { value: 'ip', label: t('services.ip') },
    { value: 'license', label: t('services.license') },
    { value: 'other', label: t('services.other') },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-muted/20 border-t border-border mt-12 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Side: Copy */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {t('sectionTitle')}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
              {t('sectionSubtitle')}
            </p>
            
            <dl className="mt-10 space-y-6 text-muted-foreground">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                </dt>
                <dd>{t('address')}</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone className="h-6 w-6 text-primary" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-primary transition-colors" href="tel:+998552050555">
                    +998 55 205 05 55
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-primary transition-colors" href="mailto:hello@techway.tech">
                    hello@techway.tech
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Side: Form */}
          <div className="bg-card rounded-3xl p-8 sm:p-10 shadow-2xl ring-1 ring-border/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input 
                    id="name" 
                    {...register('name')} 
                    placeholder="John Doe"
                    className="rounded-xl"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message as string}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service">{t('service')}</Label>
                  <select
                    id="service"
                    {...register('service')}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all appearance-none cursor-pointer hover:border-primary/50"
                    aria-invalid={!!errors.service}
                  >
                    <option value="" disabled>{t('service')}</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-xs text-destructive">{errors.service.message as string}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input 
                  id="phone" 
                  {...register('phone')} 
                  placeholder="+998 (__) ___-____"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('message')}</Label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  placeholder="How can we help your business grow?"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message.message as string}</p>}
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-md font-semibold mt-4 transition-all"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  t('submit')
                )}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
