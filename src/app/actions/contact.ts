'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  service: z.string().min(1, 'Service is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContact(prevState: any, formData: FormData) {
  try {
    const data = {
      name: formData.get('name')?.toString() || '',
      service: formData.get('service')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      message: formData.get('message')?.toString() || '',
    };

    // Validate using Zod
    const validatedData = contactSchema.parse(data);

    // Insert into Supabase
    const supabase = await createClient();
    const { error } = await (supabase as any).from('contact_submissions').insert([
      {
        name: validatedData.name,
        email: validatedData.service, // Repurposing email column for service if it exists, or just storing it there
        phone: validatedData.phone || null,
        message: validatedData.message,
      },
    ]);

    if (error) {
      console.error('Supabase insert error in contact form:', error.message);
      return { success: false, error: 'database_error' };
    }

    return { success: true, error: null };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: 'validation_error' };
    }
    console.error('Unexpected error in contact form submission:', err);
    return { success: false, error: 'unexpected_error' };
  }
}
