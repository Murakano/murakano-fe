// src/pages/index.js
import Header from "@/components/common/organisms/Header";
import styled from "styled-components";
import { LogoText } from "@/styles/commonStyles";
import SearchBar from "@/components/search/atoms/SearchBar";
import router from "next/router";
import SearchDropdown from "@/components/search/molecules/SearchDropdown";

export default function Search() {
  // 메인 홈 이동
  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <Header $isHome />
      <Section>
        <Title onClick={redirectToHome}>
          <Logo />
          <LogoText>머라카노</LogoText>
        </Title>
        <SubText>개발자들을 위한 한국어 발음 검색 서비스</SubText>
        <SearchBar />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  box-sizing: border-box;
  height: calc(100vh - 130px);
  width: 780px;
  overflow: auto;
`;

const Logo = styled.div`
  width: 70px;
  height: 70px;
  background-image: url("murak-logo-removebg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const SubText = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #666666;
  margin-bottom: 20px;
`;
