// 코드예시.
// 검색어에 따른 동적 라우팅 페이지
import Header from "@/components/common/organisms/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import CategoryDate from "@/components/search/molecules/CategoryDate";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;

  return (
    <Container>
      <Header />
      <Section>
        {query ? <CategoryDate />

        <ResultWord>{query}</ResultWord>
: <h1>검색어를 입력해주세요.</h1>}</Section>
    </Container>
  );

}
const ResultWord = styled.div`
  color: #000000;
  width: 691px;
  height: 102px;
  padding: 10px;
  gap: 29px;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.03em;
`;
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