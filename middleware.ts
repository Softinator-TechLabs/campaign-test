import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');

  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  const token = tokenCookie.value;

  try {
    // For directly verify the token from server side without calling api
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
          Authorization: `Bearer ${token}`
        }
      }
    );
    const result = await response.json();

    if (result?.decodedToken.admin && result.Error == 'no-error') {
      return NextResponse.next();
    } else {
      const response = NextResponse.redirect(new URL('/signin', req.url));
      response.cookies.set('token', '', { maxAge: -1, path: '/' });
      return response;
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    const response = NextResponse.redirect(new URL('/signin', req.url));
    response.cookies.set('token', '', { maxAge: -1, path: '/' });
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|api|signin).*)']
};
