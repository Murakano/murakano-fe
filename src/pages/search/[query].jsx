import styled from 'styled-components';
import { useRouter } from 'next/router';
import CategoryDate from '@/components/search/molecules/CategoryDate';
import ResultBox from '@/components/search/molecules/ResultBox';
import SorryComponent from '@/components/search/molecules/SorryComponent';
import ContributorEditBtn from '@/components/search/molecules/ContributorEditBtn';
import api from '@/utils/api';
import { useEffect, useState } from 'react';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResult = async () => {
      // try {
      //   const response = await api.get(`/words/search/${query}`);
      //   setSearchResult(response.data);
      //   setLoading(false);
      // } catch (error) {
      //   console.error(error);
      // }
    };
    fetchSearchResult();
  }, [query]);

  return (
    <Section>
      {query ? (
        <StyledContainer>
          <CategoryDate />
          <ResultWord>{query}</ResultWord>
          <ResultBox />
          <ContributorEditBtn />
        </StyledContainer>
      ) : (
        <SorryComponent query={query} />
      )}
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
  box-sizing: border-box;
  height: calc(100vh - 130px);
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;
