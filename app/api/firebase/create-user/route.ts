import { auth } from '@/lib/firebase/firebase_admin';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  try {
    console.log('here');
    await auth.createUser({
      email: 'anand@gmail.com',
      emailVerified: false,
      password: 'ananddudi',
      displayName: 'anand dudi',
      disabled: false
    });
    console.log('User created successfully');
    return NextResponse.json({});
  } catch (error: any) {
    console.error('Error creating user: ', error);
    return NextResponse.json({ Error: error.message });
  }
}
