export async function signSession(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${payload}.${signatureHex}`;
}

export async function verifySession(signedPayload: string, secret: string): Promise<string | null> {
  const [payload, signatureHex] = signedPayload.split('.');
  if (!payload || !signatureHex) return null;
  
  const expected = await signSession(payload, secret);
  if (expected === signedPayload) return payload;
  return null;
}
