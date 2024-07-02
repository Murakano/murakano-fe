import Header from '@/components/common/organisms/Header';
import { Container } from '@/styles/commonStyles';
import { useRouter } from 'next/router';

export default function BaseLayout({ children }) {
  const router = useRouter();
  const margintop = router.pathname === '/' ? '38px' : '130px';

  return (
    <Container margintop={margintop}>
      <Header />
      {children}
    </Container>
  );
}
