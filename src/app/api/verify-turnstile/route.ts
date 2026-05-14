import { NextResponse } from 'next/server';
import { signSession } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not defined.");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Call Cloudflare to verify the token
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const outcome = await result.json();

    if (outcome.success) {
      // Issue session cookie
      const sessionSecret = process.env.SESSION_SECRET || 'default-secret-for-dev-only-change-me';
      
      // The payload can be anything, e.g. an expiration timestamp
      const expiresAt = Date.now() + 1000 * 60 * 60 * 2; // 2 hours
      const payload = Buffer.from(JSON.stringify({ clearance: true, expiresAt })).toString('base64');
      const signedSession = await signSession(payload, sessionSecret);

      const response = NextResponse.json({ success: true });
      response.cookies.set('cf_clearance_custom', signedSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2, // 2 hours
      });

      return response;
    } else {
      console.error("Turnstile verification failed:", outcome);
      return NextResponse.json({ error: 'Invalid Turnstile token' }, { status: 403 });
    }

  } catch (error) {
    console.error("Error verifying turnstile token:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
