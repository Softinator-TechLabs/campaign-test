import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function middleware(req: NextRequest) {
  console.log('middleware invoked');
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

    console.log('ran');
    if (result?.decodedToken.admin && result.Error == 'no-error') {
      console.log('inside');
      return NextResponse.next();
    } else {
      console.log('outside');
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
