import styled from 'styled-components';
import { useRouter } from 'next/router';
import CategoryDate from '@/components/search/molecules/CategoryDate';
import ResultBox from '@/components/search/molecules/ResultBox';
import SorryComponent from '@/components/search/molecules/SorryComponent';
import ContributorEditBtn from '@/components/search/molecules/ContributorEditBtn';
import api from '@/utils/api';
import { useEffect, useState } from 'react';
import { useSearchTermStore } from '@/store/useSearchTermStore';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearchTermStore();

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const response = await api.post(`/words/search/${encodeURIComponent(query)}`);
        setSearchResult(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    if (query) fetchSearchResult();
  }, [query]);

  if (loading) {
    return null; // 로딩 중일 때는 아무것도 렌더링하지 않습니다.
  }

  return (
    <Section>
      {loading ? null : !query || !searchResult ? (
        <SorryComponent query={query} />
      ) : (
        <StyledContainer>
          <CategoryDate searchResult={searchResult} />
          <ResultWord>{searchResult.word}</ResultWord>
          <ResultBox searchResult={searchResult} />
          <ContributorEditBtn searchResult={searchResult} />
        </StyledContainer>
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
  width: auto;
  height: 102px;
  padding: 10px;
  gap: 29px;
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  text-align: center;
`;
