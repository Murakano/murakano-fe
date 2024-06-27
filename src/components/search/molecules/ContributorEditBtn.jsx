import React from 'react';
import styled from 'styled-components';
import Contributor from '../atoms/Contributor';
import ResultEditBtn from '../atoms/ResultEditBtn';

export default function ContributorEditBtn() {
  return(
    <StyledContainer>
      <Contributor />
      <ResultEditBtn />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 691px;
  height: 61px;
  margin: 10px 44.5px 246.29px 44.5px;
`;
