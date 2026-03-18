import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('Authorization');

  // Verify secret token from query param or auth header
  if (
    searchParams.get('secret') !== process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Simple query to keep DB active
    const { data, error } = await supabase
      .from('services')
      .select('id')
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Supabase pinged successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Cron Keep-Alive Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
