import { useEffect } from 'react';
import Header from '@/components/common/organisms/Header';
import { Container } from '@/styles/commonStyles';
import { useRouter } from 'next/router';

import useAuthStore from '@/store/useAuthStore';

export default function BaseLayout({ children }) {
  const { accessToken, silentRefresh, fetchAuthData } = useAuthStore();
  const router = useRouter();
  const marginTop = router.pathname === '/' ? '38px' : '130px';

  // access token 없으면, 바로 요청
  useEffect(() => {
    if (!accessToken) {
      fetchAuthData();
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
    </Container>
  );
}
