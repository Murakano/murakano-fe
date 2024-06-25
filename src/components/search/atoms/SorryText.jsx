import { Container as MuiContainer } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const SorryText = ({ query }) => {
  return (
    <StyledContainer>
      <MuiContainer>
        <StyledSorryText>
          죄송합니다.<br />
          "{query}" 검색 결과가 없습니다.
        </StyledSorryText>
      </MuiContainer>
    </StyledContainer>
  );
};

const StyledSorryText = styled.h1`
  color: #000;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  line-height: 60px;
  letter-spacing: -0.03em;
  padding: 12.46px 160.5px 12.46px 160.5px;
`;

const StyledContainer = styled.div`
  width: 782px;
  height: 144.93px;
  margin: 136.04px 1px 0px 1px;
  justify-content: space-between;
`;

export default SorryText;