import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from '@/api';

const protectedRoutes = ['/'];
const publicRoutes = ['/sign-in', '/sign-up'];

async function middleware(request: NextRequest): Promise<NextResponse> {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute) {
    try {
      await checkAuth();

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
  }

  if (isPublicRoute) {
    try {
      await checkAuth();

      return NextResponse.redirect(new URL('/', request.nextUrl));
    } catch (error) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export default middleware;
