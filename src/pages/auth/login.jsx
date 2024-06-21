import styled from "styled-components";
import Header from "@/components/common/organisms/Header";
import SocialLogin from "@/components/auth/organisms/SocialLogin";
import LoginForm from "@/components/auth/organisms/LoginForm";

export default function Login() {
  return (
    <Container>
      <Header />
      <Section>
        <PageTitle>로그인</PageTitle>
        <LoginForm />
        <SocialLogin />
        <Inc>© Murak, Inc.</Inc>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const PageTitle = styled.div`
  padding-top: 52px;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.03em;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  width: 780px;
`;

const Inc = styled.div`
  font-family: Roboto;
  font-size: 14.5px;
  font-weight: 400;
  line-height: 16.99px;
  padding-top: 10px;
`;
