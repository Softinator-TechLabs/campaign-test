import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');

  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  const token = tokenCookie.value;

  try {
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // if (decodedToken.admin) {
    //   return NextResponse.next();
    // } else {
    //   return NextResponse.redirect(new URL('/signin', req.url));
    // }
    const response = await fetch(
      `${req.nextUrl.origin}/api/firebase/verify-token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Send the token in the Authorization header
        }
      }
    );
    const result = await response.json();
    if (result.Error === 'no-error') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|api|signin).*)']
};
