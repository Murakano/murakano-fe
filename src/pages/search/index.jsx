// src/pages/index.js
import Header from "@/components/common/organisms/Header";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { query } = router.query;

  return (
    <Container>
      <Header />
      <Section>
        {/* 트루 여기에 검색결과 페이지 넣어주면 돼! */}
        search
        {query ? <h1>검색 결과: {query}</h1> : <h1>검색어를 입력해주세요.</h1>}
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
