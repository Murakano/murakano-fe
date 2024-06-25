import styled from 'styled-components';
import Header from '@/components/common/organisms/Header';
import RegisterForm from '@/components/auth/organisms/RegisterFormTemp';
import { Container } from '@/styles/commonStyles';

export default function Register() {
  return (
    <Container>
      <Header />
      <Page>
        <Section>
          <PageTitle>회원가입</PageTitle>
          <Main>
            <RegisterForm />
          </Main>
        </Section>
      </Page>
    </Container>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100.5px 0;
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
