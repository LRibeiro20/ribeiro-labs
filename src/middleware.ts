import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  // Only intercept /api/* and /api-proxy/* routes
  if (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname.startsWith('/api-proxy/')) {
    
    // Explicitly allow the Turnstile verification endpoint itself
    if (request.nextUrl.pathname === '/api/verify-turnstile') {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('cf_clearance_custom');
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Forbidden: Turnstile challenge not solved' }, { status: 403 });
    }

    const sessionSecret = process.env.SESSION_SECRET || 'default-secret-for-dev-only-change-me';
    const payloadRaw = await verifySession(sessionCookie.value, sessionSecret);

    if (!payloadRaw) {
      return NextResponse.json({ error: 'Forbidden: Invalid or tampered clearance session' }, { status: 403 });
    }

    try {
      // payloadRaw is base64 encoded JSON
      const payloadString = atob(payloadRaw);
      const payload = JSON.parse(payloadString);
      
      if (Date.now() > payload.expiresAt) {
        return NextResponse.json({ error: 'Forbidden: Clearance session expired' }, { status: 403 });
      }
    } catch (e) {
      return NextResponse.json({ error: 'Forbidden: Malformed clearance session' }, { status: 403 });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Match both standard API routes and proxied API routes (like FastAPI WebSocket proxy)
  matcher: ['/api/:path*', '/api-proxy/:path*'],
};
