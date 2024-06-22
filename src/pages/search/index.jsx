// src/pages/index.js
import Header from "@/components/common/organisms/Header";
import styled from "styled-components";

export default function Search() {
  return (
    <Container>
      <Header />
      <Section>
        {/* 트루 여기에 검색결과 페이지 넣어주면 돼! */}
        search
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 130px;
  height: 100vh;
  width: 780px;
`;
