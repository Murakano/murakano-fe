// 코드예시.
// 검색어에 따른 동적 라우팅 페이지

import Header from '@/components/common/organisms/Header';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;

  return (
    <Container>
      <Header />
      <Section>{query ? <h1>검색 결과: {query}</h1> : <h1>검색어를 입력해주세요.</h1>}</Section>
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
  width: 780px;ㅊㄴㄴ
`;
