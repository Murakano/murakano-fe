import React from 'react';
import styled from 'styled-components';
import Contributor from '../atoms/Contributor';
import ResultEditBtn from '../atoms/ResultEditBtn';

export default function ContributorEditBtn({ searchResult }) {
  const hasContributor = Boolean(searchResult.suggestedBy);
  return (
    <StyledContainer $hasContributor={hasContributor}>
      {hasContributor ? <Contributor searchResult={searchResult} /> : null}
      <ResultEditBtn searchResult={searchResult} />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$hasContributor ? 'space-between' : 'flex-end')};
  align-items: flex-end;
  width: 691px;
  height: 61px;
  margin-top: 10px;
  @media (max-width: 600px) {
    width: ${(props) => (props.$header ? '460px' : '350px')};
    
  }
`;
