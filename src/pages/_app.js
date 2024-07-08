import '@/styles/globals.css';
import BaseLayout from './base';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '@/store/useAuthStore';

export default function App({ Component, pageProps }) {
  const { accessToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // 비로그인 유저의 내 요청 페이지 접근 막기
    if (!accessToken && ['/auth/requests'].includes(router.pathname)) {
      alert('로그인이 필요합니다.');
      router.replace('/auth/login');
    }
    // 로그인된 유저의 로그인/회원가입 페이지 접근 막기
    if (accessToken && ['/auth/login', '/auth/register'].includes(router.pathname)) {
      console.log('로그인 된 유저가 로그인/회원가입 페이지로 접속 시도');
      router.replace('/');
    }
  }, [accessToken, router]);

  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}
