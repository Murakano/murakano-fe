import { Container as MuiContainer } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const SorryText = ({ query }) => {
  return (
    <StyledContainer>
      <MuiContainer>
        <StyledSorryText>
          죄송합니다.
          <br />"{query}"<br /> 검색 결과가 없습니다.
        </StyledSorryText>
      </MuiContainer>
    </StyledContainer>
  );
};

const StyledSorryText = styled.h1`
  color: #000;
  font-size: 33px;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  padding: 12.46px 0;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 144.93px;
  justify-content: space-between;
`;

export default SorryText;
