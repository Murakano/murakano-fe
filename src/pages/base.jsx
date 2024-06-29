import Header from '@/components/common/organisms/Header';
import { Container } from '@/styles/commonStyles';

export default function BaseLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
