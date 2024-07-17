import React from 'react';
import styled from 'styled-components';

const SorryText = ({ query }) => {
  return (
    <StyledContainer>
      <StyledSorryTexts>
        <StyledSorryText>
          죄송합니다.
          <br />"{query}"<br /> 검색 결과가 없습니다.
        </StyledSorryText>
      </StyledSorryTexts>
    </StyledContainer>
  );
};

const StyledSorryTexts = styled.div`
  color: #000;
  font-size: 33px;
  font-weight: 600;
  line-height: 50px;
  padding: 12.46px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSorryText = styled.div`
  text-align: center;
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 144.93px;
  justify-content: space-between;
`;

export default SorryText;
