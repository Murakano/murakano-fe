import Header from '@/components/common/organisms/Header';
import { Container } from '@/styles/commonStyles';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/getCookie';

export default function BaseLayout({ children }) {
  const router = useRouter();
  const margintop = router.pathname === '/' ? '38px' : '130px';
  const token = getCookie();
  console.log(token, 'baseLayout', 999);

  return (
    <Container margintop={margintop}>
      <Header />
      {children}
    </Container>
  );
}
