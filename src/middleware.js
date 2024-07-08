import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parse } from 'cookie';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

// 로그인이 필요한 페이지 목록
const protectedRoutes = ['/auth/requests'];
// 로그인이 되면 접근할 수 없는 페이지 목록
const publicRoutes = ['/auth/login', '/auth/register'];

export function middleware(request = NextRequest) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.refreshToken;
  console.log(token);

  const currentPath = request.nextUrl.pathname;

  if (!token && protectedRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('message', '로그인이 필요한 페이지입니다');
    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
