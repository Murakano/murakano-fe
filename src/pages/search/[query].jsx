// 코드예시.
// 검색어에 따른 동적 라우팅 페이지
import Header from "@/components/common/organisms/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import CategoryDate from "@/components/search/molecules/CategoryDate";
import ResultBoxIntegration from "@/components/search/organisms/ResultBoxIntegration";
import SorryText from "@/components/search/atoms/SorryText"; 
import AddRequestBtn from  "@/components/search/atoms/AddRequestBtn";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;

  return (
    <Container>
      <Header />
      <Section>
        {query ? (
          <>
            <CategoryDate />
            <ResultWord>{query}</ResultWord>
            <ResultBoxIntegration />
          </>
        ) : (
          <>
            <SorryText query={query} /> 
            <AddRequestBtn />
          </>
        )}
      </Section>
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