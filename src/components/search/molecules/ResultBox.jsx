import React from 'react';
import styled from 'styled-components';
import ResultTitleComponent from '@/components/search/atoms/ResultTitleComponent';
import ResultContentComponent from '@/components/search/atoms/ResultContentComponent';

export default function ResultBox({ searchResult }) {
  return (
    <StyledContainer>
      <Container>
        <ResultTitleComponent>일반적인 발음</ResultTitleComponent>
        <ResultContentComponent>{searchResult.comPron}</ResultContentComponent>
      </Container>
      <Container>
        <ResultTitleComponent>어색한 발음</ResultTitleComponent>
        <ResultContentComponent>{searchResult.awkPron}</ResultContentComponent>
      </Container>
      <Container>
        <ResultTitleComponent>추가 정보</ResultTitleComponent>
        <ResultContentComponent>{searchResult.info}</ResultContentComponent>
      </Container>
    </StyledContainer>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 691px;
  height: auto;
  padding: 18.5px 30px;
  margin-bottom: 10px;
  border-radius: 30px;
  background-color: var(--secondary10);
  gap: 8px;
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px 30px;
  }
`;

const StyledContainer = styled.div`
  width: 691px;
  height: auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;
