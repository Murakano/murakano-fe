import styled from 'styled-components';
import SocialLogin from '@/components/auth/organisms/SocialLogin';
import LoginForm from '@/components/auth/organisms/LoginForm';

export default function Login() {
  return (
    <Page>
      <Section>
        <PageTitle>로그인</PageTitle>
        <Main>
          <LoginForm />
          <SocialLogin />
          <Inc>© Murak, Inc.</Inc>
        </Main>
      </Section>
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 92.5px 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 780px;
  justify-content: center;
`;
const PageTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
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
