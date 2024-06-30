import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { ErrorMessage } from '@/constants/errorMessage';
import api from '@/utils/api';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};

// 로그인이 필요한 페이지 목록
const protectedRoutes = ['/auth/requests'];
// 로그인이 되면 접근할 수 없는 페이지 목록
const publicRoutes = ['/auth/login', '/auth/register'];

export function middleware(request = NextRequest) {
  const token = getTokenFromCookies(request);
  const currentPath = request.nextUrl.pathname;

  if (!token && protectedRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
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
  let refreshToken = cookies.get('refreshToken');
  if (!accessToken && refreshToken) {
    accessToken = refreshAccessToken(refreshToken);
  }
  // NOTE : accessToken을 클라이언트 브라우저 쿠키에 등록 하는 것이 안되서
  // 우선 기존 처럼 HeaderBtn에서 accessToken 없으면 refreshToken으로 accessToken 가져오는 중
  // Next auth 고려
  return accessToken;
}

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    const data = await response.json();
    console.log(data);

    const newAccessToken = data.newAccessToken;
    const newRefreshToken = data.newRefreshToken;
    return newAccessToken;
  } catch (error) {
    console.log(error);
    console.log(ErrorMessage.TOKEN_ERROR);
    return;
  }
};
