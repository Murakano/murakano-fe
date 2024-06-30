import Header from "@/components/common/organisms/Header";
import styled from "styled-components";
import { useRouter } from "next/router";
import CategoryDate from "@/components/search/molecules/CategoryDate";
import ResultBoxIntegration from "@/components/search/organisms/ResultBoxIntegration";
import SorryComponent from "@/components/search/molecules/SorryComponent";
import ContributorEditBtn from "@/components/search/molecules/ContributorEditBtn";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;

  return (
    <Container>
      <Header />
      <Section>
        {query ? (
          <>
            <StyledContainer>
              <CategoryDate />
              <ResultWord>{query}</ResultWord>
              <ResultBoxIntegration />
              <ContributorEditBtn />
            </StyledContainer>
          </>
        ) : (
          <>
            <SorryComponent query={query} />
          </>
        )}
      </Section>
    </Container>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 130px;
  box-sizing: border-box;
  height: 100vh;
  max-width: 100vw;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 330px 124px;
`;

const ResultWord = styled.div`
  color: #000;
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