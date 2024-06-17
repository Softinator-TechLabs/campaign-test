import { auth } from '@/lib/firebase/firebase_admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token is missing');
    }

    const decodedToken = await auth.verifyIdToken(token);
    return NextResponse.json({ Error: 'no-error', decodedToken });
  } catch (error: any) {
    console.error('Error verifying token: ', error);
    return NextResponse.json({ Error: error.message });
  }
}
