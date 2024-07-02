import Header from '@/components/common/organisms/Header';
import { Container } from '@/styles/commonStyles';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/getCookie';
import { useEffect } from 'react';

export default function BaseLayout({ children }) {
  const router = useRouter();
  const margintop = router.pathname === '/' ? '38px' : '130px';

  useEffect(() => {
    const accessToken = getCookie();
    console.log('base', accessToken, 1001);
    if (!accessToken) {
      console.log('base', accessToken, 1002);
    }
  }, []);

  return (
    <Container margintop={margintop}>
      <Header />
      {children}
    </Container>
  );
}
