'use server';

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

    console.log('[submitContact] Received data:', data);

    // Validate using Zod
    const validatedData = contactSchema.parse(data);

    // Re-connect to Supabase
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    
    const { error } = await supabase.from('contact_submissions').insert({
        name: validatedData.name,
        service: validatedData.service,
        phone: validatedData.phone,
        message: validatedData.message
    });

    if (error) {
        console.error('[submitContact] Supabase error:', error.message, error.details);
        return { success: false, error: 'database_error', details: error.message };
    }

    // 🔥 Send Telegram Notification asynchronously (don't block the UI response)
    const { sendTelegramNotification } = await import('@/lib/telegram');
    // We don't await this so the user gets "Success" message immediately
    sendTelegramNotification({
      name: validatedData.name,
      service: validatedData.service,
      phone: validatedData.phone,
      message: validatedData.message
    }).catch(e => console.error('[submitContact] Telegram notification failed:', e));

    console.log('[submitContact] Success');
    return { success: true, error: null };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      console.warn('[submitContact] Validation error:', err.issues);
      const firstIssue = err.issues[0];
      const field = String(firstIssue.path[0]);
      const message = firstIssue.message;
      let userFriendlyMessage = `${field}: ${message}`;
      if (field === 'message' && message.includes('10')) {
        userFriendlyMessage = "Xabar kamida 10 ta belgidan iborat boʻlishi kerak.";
      } else if (message.includes('required')) {
        userFriendlyMessage = "Iltimos, barcha maydonlarni toʻldiring.";
      }
      return { success: false, error: 'validation_error', details: userFriendlyMessage };
    }
    console.error('[submitContact] Unexpected error:', err);
    return { success: false, error: 'unexpected_error', details: err?.message || String(err) };
  }
}
