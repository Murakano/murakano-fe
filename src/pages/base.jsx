import { useEffect } from 'react';
import Header from '@/components/common/organisms/Header';
import { Container } from '@/styles/commonStyles';
import { useRouter } from 'next/router';

import useAuthStore from '@/store/useAuthStore';

export default function BaseLayout({ children }) {
  const { accessToken, silentRefresh } = useAuthStore();
  const router = useRouter();
  const marginTop = router.pathname === '/' ? '38px' : '130px';

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
