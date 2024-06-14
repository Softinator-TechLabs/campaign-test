import { NextRequest, NextResponse } from 'next/server';
// import { verifyIdToken } from './lib/firebase/firebase_admin';

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get('token')?.value; // Assuming token is stored in cookies

//   if (!token) {
//     return NextResponse.redirect(new URL('/signin', req.url));
//   }

//   try {
//     return NextResponse.next();
//   } catch (error: any) {
//     const url = req.nextUrl.clone();
//     url.pathname = '/signin';
//     return NextResponse.redirect(url);
//   }
// }

// export const config = {
//   matcher: ['/'] // Protect these routes
// };

export async function middleware(req: NextRequest) {}
