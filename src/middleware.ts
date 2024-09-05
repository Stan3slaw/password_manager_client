import { NextRequest, NextResponse } from 'next/server';

import { checkAuth } from '@/api';

const protectedRoutes = ['/'];
const publicRoutes = ['/sign-in', '/sign-up'];

async function middleware(request: NextRequest): Promise<NextResponse> {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  try {
    const { isAuth } = await checkAuth();

    if (isAuth && isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  } catch (error) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
    }
  }

  return NextResponse.next();
}

export default middleware;
