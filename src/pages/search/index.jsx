// src/pages/index.js
import Header from "@/components/common/organisms/Header";
import styled from "styled-components";
import { LogoText } from "@/styles/commonStyles";
import SearchBar from "@/components/search/atoms/SearchBar";
import router from "next/router";

export default function Search() {
  // 메인 홈 이동
  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <Header />
      <Section></Section>
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 200px;
  height: 100vh;
  width: 780px;
`;
