import styled from 'styled-components';
import Header from '@/components/common/organisms/Header';
import SocialLogin from '@/components/auth/organisms/SocialLogin';
import LoginForm from '@/components/auth/organisms/LoginForm';
import { Container } from '@/styles/commonStyles';

export default function Login() {
  return (
    <Container>
      <Header />
      <Section>
        <PageTitle>로그인</PageTitle>
        <Main>
          <LoginForm />
          <SocialLogin />
          <Inc>© Murak, Inc.</Inc>
        </Main>
      </Section>
    </Container>
  );
}

const PageTitle = styled.div`
  padding-top: 50px;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 780px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 540px;
  padding: 11.5px 46px 74px;
`;

const Inc = styled.div`
  font-size: 14.5px;
  font-weight: 400;
  padding-top: 10px;
`;
