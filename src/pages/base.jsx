import { useEffect } from 'react';
import Header from '@/components/common/organisms/Header';
import { Container } from '@/styles/commonStyles';
import { useRouter } from 'next/router';

import useAuthStore from '@/store/useAuthStore';
import Footer from '@/components/common/organisms/Footer';

export default function BaseLayout({ children }) {
  const { accessToken, silentRefresh, fetchAuthData, expiresAt, clearAuthData } = useAuthStore();
  const router = useRouter();
  const marginTop = router.pathname === '/' ? '38px' : '130px';

  // access token 없으면, 바로 요청
  useEffect(() => {
    if (!accessToken) {
      fetchAuthData();
    }
    if (expiresAt && new Date(expiresAt) < new Date()) {
      clearAuthData();
    }
  }, []);

  // access token 발급시마다 silent refresh 실행
  useEffect(() => {
    silentRefresh();
  }, [accessToken]);

  return (
    <Container $marginTop={marginTop}>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}
