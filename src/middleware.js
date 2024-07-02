// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

export function middleware(request = NextRequest) {
  const token = getTokenFromCookies(request);
  console.log(token);

  const response = NextResponse.next();
  if (token) {
    response.headers.set('x-access-token', token);
  }

  return response;
}

function getTokenFromCookies(request) {
  const cookiesHeader = request.headers.get('cookie');
  if (!cookiesHeader) return null;

  const cookiesArray = cookiesHeader.split('; ').map((cookie) => {
    const [key, value] = cookie.split('=');
    return [key, value];
  });

  const cookies = new Map(cookiesArray);
  let accessToken = cookies.get('accessToken');
  return accessToken;
}
