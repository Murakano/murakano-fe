import styled from 'styled-components';
import Header from '@/components/common/organisms/Header';
import RegisterForm from '@/components/auth/organisms/RegisterForm';
import { Container } from '@/styles/commonStyles';

export default function Register() {
  return (
    <Page>
      <Section>
        <PageTitle>회원가입</PageTitle>
        <Main>
          <RegisterForm />
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
  padding: 100.5px 0;
  @media (max-width: 600px) {
    padding: 20px 0;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 780px;
  justify-content: center;
  @media (max-width: 600px) {
    width: 100%; // 반응형 정렬 수정
    height: auto;
  }
`;
const PageTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 540px;
  padding: 11.5px 46px 74px;
  @media (max-width: 600px) {
    width: 100%; // 반응형 정렬 수정
    height: auto;
  }
`;
